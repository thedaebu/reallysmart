import { setupServer } from 'msw/node'
import { handlers } from './test_handlers'

const server = setupServer(...handlers)
export default server;