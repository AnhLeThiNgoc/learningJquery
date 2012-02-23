<?php

$entries = array(
	
	'FORCE' => array(
		
		'part' => 'n.',
		'definition' => ' ', 
						 
		'quote' => array(
			'Force is but might," the teachersaid -',
			'"That definition\'s just."',
			'The boy said naught but thought instead',
			'Remembering his pounded head:',
			'Force is not might but must',
		 ),		

	),
	'FORGETFULNESS' => array(
			'part' => 'n.',
			'definition' => 'A gift of God bestowed upon doctors in 
							compesation for their destitution of consciensce.',
	),
);

foreach ($entries as $term => $entry) {
	if (strpos($term, strtoupper($_REQUEST['term'])) !== FALSE) {
		$html = '<div class="entry">';
		$html .= '<h3 class="term">';
		$html .= $term;
		$html .= '</h3>';
		$html .= '<div class="part">';
		$html .= $entry['part'];
		$html .= '</div>';
		$html .= '<div class="definition">';
		$html .= $entry['definition'];
		if (isset($entry['quote'])) {
			foreach ($entry['quote'] as $line) {
				$html .= '<div class="quote-line">'. $line .'</div>';
			}
			if (isset($entry['author'])) {
				$html .= '<div class="quote-author">'. $entry['author']
						.'</div>';
			}
		}
		$html .= '</div>';
		$html .= '</div>';
		print($html);
	}
}