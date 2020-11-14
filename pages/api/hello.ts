import { NextApiRequest, NextApiResponse } from 'next';

type TData = {
  text: string
}

export default (req: NextApiRequest, res: NextApiResponse<TData>) => {
  res.status(200).json({ text: 'Hello' });
};
