<?php

use Flarum\Database\Migration;

return Migration::addColumns('ranks', ['groups' => ['json', 'nullable' => true]]);
