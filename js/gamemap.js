/*

******************************
*         Agis Game          *
*    A game dedicated to     *
*       Agnaldo Fuhrer       *
*   my best living friend    *
* who's got lost in my sight *
* Hope I'll find him again.  *
******************************
 ___________________________
/                           \
| o        S' GIT         o |
|   Solothurn & Grenchen    |
|       Institutes of       |
| o   gaming Technology   o |
\___________________________/

by Benedict Jäggi 2020

Map & Map Editor

*/

// the global parser holds some global values.
var GMLParser_MAPGLOBAL = function()
{
	var me = this;
	this.actualMapIntern = "";
	this.startX=0;
	this.startY=0;
	this.startMapIntern = "";
	this.parseGML = function(json, rootPath)
	{
		// get the start map. (StartMap)
		// also set the actual room to the start room.
		if(__defined(json['STARTMAP']))
			me.actualMapIntern = me.startMapIntern = json['STARTMAP'];
		// and the start position of the main character.
		if(__defined(json['STARTPOSX']))
			me.startX = json['STARTPOSX'];
		if(__defined(json['STARTPOSY']))
			me.startY = json['STARTPOSY'];
		
		// all images will be css-ed right now so no scale here
		/* // get the global scale factor.
		if(__defined(json['SCALEFACTOR']))
			me.scaleFactor = parseFloat(json['SCALEFACTOR']);
		if(__defined(json['SCALE']))
			me.scaleFactor = parseFloat(json['SCALE']);
		*/
	}
	this.clear = function()
	{
		me.actualMapIntern = "";
		me.startMapIntern = "";
		me.startX = 0;
		me.startY = 0;
	}
}

// a map tile in the tile view and on the map
// those are different but in the same class here.
// first gets CLASSES from gml.
// second gets CLASSES from tile list, set with gml.
var aMapTile = function()
{
	var me = this;
	this.intern="";
	this.classes =""
	
	// position is set wenn set on a map.
	this.posX=0;
	this.posY=0;
	this.parseGML = function(json, rootPath)
	{
		// get the start map. (StartMap)
		// also set the actual room to the start room.
		if(__defined(json['INTERN']))
			me.intern = json['INTERN'];
		// and the start position of the main character.
		if(__defined(json['CLASSES']))
			me.classes = json['CLASSES'];
	}
}

// a map holds map tiles with their intern names.
var aGameMap = function()
{
	var me = this;
	var sizex = 20;
	var sizey = 20;
	
	this.parseGML = function(json, rootPath)
	{
		
	}
	
	this.UPDATE=function(deltatime)
	{
	}
	
	this.RENDER=function()
	{
	
	}
}

var aMapEditor = function(map)
{
	var me = this;
	var m_Map = null;
	if(map!=null)
		m_Map=map;
	else
		m_Map=new aGameMap();
		
	this.UPDATE=function(deltatime)
	{
		m_Map.UPDATE();
	}
	
	this.RENDER = function()
	{
		m_Map.RENDER();
	}
}
