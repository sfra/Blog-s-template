<?php



set_cache(ob_get_contents(), $url);

ob_end_flush(); // Send the output to the browse
