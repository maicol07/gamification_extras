<?php

use Flarum\Database\Migration;

return Migration::addColumns('groups', ['sticky_ranks' => ['integer', 'nullable' => true]]);
