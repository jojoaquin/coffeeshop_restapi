use coffeeshop_restapi;

show tables;

select *
from users;

select * from coffees;

delete
from coffees
where name is not null;

desc coffee_categories;

insert into coffee_categories (name)
values ('Arabika');

delete
from coffee_categories
where id = 2;

select *
from coffee_categories;

drop table coffees;