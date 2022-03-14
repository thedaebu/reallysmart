import { setupServer } from 'msw/node'
import { handlers } from './msw_handlers'

const server = setupServer(...handlers)
export default server;