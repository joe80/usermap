<?php
/**
*
* @package phpBB Extension - Wiki
 * @copyright (c) 2015 tas2580 (https://tas2580.net)
* @license http://opensource.org/licenses/gpl-2.0.php GNU General Public License v2
*
*/

if (!defined('IN_PHPBB'))
{
	exit;
}

if (empty($lang) || !is_array($lang))
{
	$lang = array();
}
// DEVELOPERS PLEASE NOTE
//
// All language files should use UTF-8 as their encoding and the files must not contain a BOM.
//
// Placeholders can now contain order information, e.g. instead of
// 'Page %s of %s' you can (and should) write 'Page %1$s of %2$s', this allows
// translators to re-order the output of data while ensuring it remains correct
//
// You do not need this where single placeholders are used, e.g. 'Message %d' is fine
// equally where a string contains only two placeholders which are used to wrap text
// in a url you again do not need to specify an order e.g., 'Click %sHERE%s' is fine
//
// Some characters you may want to copy&paste:
// ’ » “ ” …
//
$lang = array_merge($lang, array(
	'ACP_USERMAP_TITLE'					=> 'Benutzer Karte',
	'ACP_SETTINGS'						=> 'Karten Einstellungen',
	'ACP_USERMAP_ZOOM'					=> 'Zoom',
	'ACP_USERMAP_ZOOM_EXPLAIN'			=> 'Standard Zoom beim aufrufen der Karte.',
	'ACP_COORDINATES'						=> 'Standard Koordinaten',
	'ACP_COORDINATES_EXPLAIN'				=> 'Koordinaten auf die die Karte beim aufrufen zentriert wird.',
	'ACP_GET_COORDINATES'					=> 'Meine Koordinaten eintragen',
	'ACP_SUBMIT'							=> 'Einstellungen speichern',
	'ACP_SAVED'							=> 'Die Einstellungen wurde erfolgreich gespeichert',
	'ACP_USERMAP_MARKER'					=> 'Benutzer Karte Marker',
	'ACP_USERMAP_MARKER_DESCRIPTION'		=> 'Wähle einen Marker der für Benutzer in dieser Gruppe auf der Benutzer Karte verwendet wird.',
	'ACP_USERMAP_COORDINATES'			=> 'Koordinaten für die Benutzer Karte',
	'ACP_USERMAP_COORDINATES_EXPLAIN'		=> 'Die Koordinaten den Benutzers für die Benutzer Karte.',
	'ACP_USERMAP_LON'					=> 'Längengrad',
	'ACP_USERMAP_LAT'						=> 'Breitengrad',
	'ACP_MAP_TYPE'						=> 'Karte',
	'ACP_MAP_TYPE_EXPLAIN'					=> 'Wähle eine Karte aus die für die Benutzer Karte verwendet wird.',
	'ACP_GOOGLE_API_KEY'					=> 'Google Maps API Key',
	'ACP_GOOGLE_API_KEY_EXPLAIN'			=> 'Trage deinen Google Maps <a href="https://developers.google.com/maps/documentation/javascript/get-api-key">API Key</a> ein un Google Maps als Karte verwenden zu können.',
	'ACP_MAP_OSM'						=> 'Open Streat Maps',
	'ACP_MAP_GOOGLE'						=> 'Google Maps',

));