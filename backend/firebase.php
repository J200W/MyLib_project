<?php

require 'vendor/autoload.php';

use Kreait\Firebase\Factory;

$factory = (new Factory)
    ->withServiceAccount('./private/l3s2-mastercamp-ebookbdd-firebase-adminSDK.json')
    ->withDatabaseUri('https://console.firebase.google.com/project/l3s2-mastercamp-ebookbdd/firestore/data/~2F"');

$database = $factory->createDatabase();

$reference = $database->getReference('ebook_test');
print($reference->getSnapshot()->getValue());
