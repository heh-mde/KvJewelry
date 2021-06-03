USE kvjew;
delimiter #
drop procedure add_test;
create procedure add_test()
begin
declare i int unsigned default 1;
while i < 100 do
	INSERT INTO `jewelry` (`type`, `vendorcode`, `name`, `price`, `stock`, `availability`, `weight`, `metal`, `image`) VALUES
	('ring', i, 'Test', 1000, NULL, 0, 0, 'yl_gold', 'Test.png');
    SET i = i + 1;
end while;
end #