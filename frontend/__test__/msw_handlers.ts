import { rest } from 'msw';
import { tracks } from './test_store_data';

export const handlers = [
  rest.get('api/tracks', (req, res, ctx) => {
    return res(
      ctx.json({
        tracks: tracks
      })
    )
  }),
]