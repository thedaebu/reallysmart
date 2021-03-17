chmod 755 setup_db.sh

bundle exec rails db:drop
bundle exec rails db:create
bundle exec rails db:schema:load
bundle exec rails db:seed