interface Sword {
  id: number;
  values: number[];
}

interface Spine {
  value: number;
  left?: number;
  right?: number;
}

const parseInput = (input: string): Sword[] => {
  return input
    .trim()
    .split('\n')
    .map(line => {
      const [id, numbers] = line.split(':');
      return {
        id: Number(id!),
        values: numbers!.split(',').map(Number),
      };
    });
};

const getSpine = (sword: Sword): Spine[] => {
  const spines: Spine[] = [];
  sword.values.forEach(value => {
    let placed = false;
    for (const spine of spines) {
      if (!spine.left && value < spine.value) {
        spine.left = value;
        placed = true;
        break;
      } else if (!spine.right && value > spine.value) {
        spine.right = value;
        placed = true;
        break;
      }
    }

    if (!placed) {
      spines.push({ value });
    }
  });

  return spines;
};

const getSpineValue = (spines: Spine[]): number => {
  return Number(spines.map(({ value }) => value).join(''));
};

export const part_1 = (data: number[]): number => {
  return getSpineValue(getSpine({ id: 0, values: data }));
};

export const part_2 = (data: string): number => {
  const swords: Sword[] = parseInput(data);
  const values = swords.map(sword => getSpineValue(getSpine(sword)));

  const max = Math.max(...values);
  const min = Math.min(...values);

  return max - min;
};

const getSpineLevelValue = (spine: Spine): number => {
  return Number(`${spine.left ?? ''}${spine.value}${spine.right ?? ''}`);
};

export const part_3 = (data: string): number => {
  const swords: Sword[] = parseInput(data);
  const spines = swords.map(sword => {
    return {
      id: sword.id,
      spines: getSpine(sword),
      spineValue: getSpineValue(getSpine(sword)),
      getSpineLevelValueS: getSpine(sword).map(getSpineLevelValue),
    };
  });

  spines.sort((a, b) => {
    let swortAValue = getSpineValue(a.spines);
    let swortBValue = getSpineValue(b.spines);
    let spineLevel = 0;

    while (
      swortAValue === swortBValue &&
      spineLevel < a.spines.length &&
      spineLevel < b.spines.length
    ) {
      swortAValue = getSpineLevelValue(a.spines[spineLevel]!);
      swortBValue = getSpineLevelValue(b.spines[spineLevel]!);
      spineLevel++;
    }

    if (swortAValue === swortBValue) {
      return b.id - a.id;
    }

    return swortBValue - swortAValue;
  });

  return spines.reduce((acc, curr, idx) => {
    return acc + curr.id * (idx + 1);
  }, 0);
};
