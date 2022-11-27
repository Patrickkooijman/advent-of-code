import axios from 'axios';

export default async function fetch(day: string) : Promise<string> {
    try {
        const { data } = await axios.get<string>(
            `https://adventofcode.com/2015/day/${day}/input`,
            {
                headers: {
                    cookie: "session=53616c7465645f5ff501a15dbc415c9e3f80281acf5eba78e1807b25d9b704acc57099f3e592bd89ed7ac1c9eb38dd940ff47264b7620e7a2edfebc403d71aef;"
                }
            },
        );

        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            return error.message;
        } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
        }
    }
}
