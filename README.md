[![Build Status](https://semaphoreci.com/api/v1/projects/e966215b-848c-445b-a248-83c9c84ccd43/332160/badge.svg)](https://semaphoreci.com/vic/mutagen)
[![Code Climate](https://codeclimate.com/github/VicNumber21/mutagen/badges/gpa.svg)](https://codeclimate.com/github/VicNumber21/mutagen)

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
