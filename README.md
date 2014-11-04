mutagen
=======

JS library to iterate through any collection based on mutable generators

Terms
-----
Mutator - function which takes item of collection and return the new value.
Each mutator is function (item).

Gen (generator) - function which produce next value in collection each time when
it is called. There are special values Skip - go to next iteration, End - stop
iterating the collection.