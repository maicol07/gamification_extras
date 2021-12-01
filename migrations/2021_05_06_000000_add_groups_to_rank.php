<?php /** @noinspection UnusedFunctionResultInspection */

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => static function (Builder $schema) {
        $schema->table('ranks', function (Blueprint $table) {
            $table->json('groups')->nullable();
        });
    },
    'down' => static function (Builder $schema) {
        $schema->table('ranks', function (Blueprint $table) {
            $table->dropColumn('groups');
        });
    },
];
