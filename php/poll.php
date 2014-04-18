<?php

// Get poll results

// Return the poll results
echo json_encode(array(
    array('option' => 'Option 1', 'votes' => 12),
    array('option' => 'Option 2', 'votes' => 20),
    array('option' => 'Option 3', 'votes' => 8)
));