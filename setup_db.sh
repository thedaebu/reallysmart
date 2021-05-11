chmod 755 setup_db.sh

bundle exec rails db:drop
bundle exec rails db:create
bundle exec rails db:schema:load
bundle exec rails db:seed

git checkout -b eddie
git add .
git commit -m "

git checkout main
git merge eddie
git -d eddie
git add .
git commit -m "
git push heroku main

# seeding
heroku pg:reset DATABASE_URL
heroku run bundle exec rails db:migrate
heroku run bundle exec rails db:seed

font-family: 'Open Sans Condensed', sans-serif;
font-family: 'Programme Regular', sans-serif;
font-family: 'Programme Light', sans-serif;
font-family: 'Ubuntu Condensed', sans-serif;
font-family: 'Raleway', sans-serif;
font-family: 'Barlow Condensed', sans-serif;

<script async src="//genius.codes"></script>