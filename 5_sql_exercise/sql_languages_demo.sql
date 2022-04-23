-- select 语句
-- select * from users
-- select username, password from users

-- insert into 语句
-- insert into users (username, password) values ('tony starrrk', '012345')

-- update 语句
-- update users set password = '333444', status = 1 where id = 3

-- delete 语句
-- delete from users where id = 3

-- where 子句
-- select * from users where id < 2

-- order by 子句
-- select * from users where id < 3 order by status desc, username desc

-- count(*) 函数
select count(*) as total from users where status = 1


