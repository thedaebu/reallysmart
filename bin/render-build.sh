set -o errexit

bundle install
yarn install
npm run postinstall
bundle exec rake assets:precompile
bundle exec rake assets:clean
bundle exec rake db:migrate
# rails db:seed