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
	var m_classes =[]
	var m_actualclass = "";

	// the actual tile.
	var m_actualtile = 1;
	
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
		// TODO: get classes as array.
		if(__defined(json['CLASSES']))
			me.classes = json['CLASSES'];
	}

	var m_html=""; // html as own variable to safe processor time.	
	this.UPDATE = function(deltatime)
	{
		m_html='<div class="'+m_actualclass+'" style="top: '+me.posX+'px; left: '+me.posY+'px;"></div>';
	}

	this.RENDER = function()
	{
		$(g_gameengine.getActualDisplayID()).append(m_html);
	}
	
	this.SWITCHTILE = function()
	{
		m_actualtile +=1;
		if(m_actualtile>=m_classes.length)
			m_actualtile = 0;
			
		// TODO: get class from array.
		m_actualclass = m_classes[m_actualtile]; //"tile ti_default_"+m_actualtile;
	}
	
	this.clear = function() {m_classes=[];}
	
	// add default classes.
	me.clear();
	m_classes.push("tile ti_default_1");
	m_classes.push("tile ti_default_2");
	m_classes.push("tile ti_default_3");
	m_classes.push("tile ti_default_2");
}

// a map holds map tiles with their intern names.
var aGameMap = function()
{
	var me = this;
	var m_sizex = 10;
	var m_sizey = 10;
	
	var m_maptiles = [];
	
	var m_somethingchanged = false;
	
	this.parseGML = function(json, rootPath)
	{
		
	}
	
	// this should be in parsegml
	this.INIT = function()
	{
		m_maptiles=[];
		for(y=0;y<m_sizey;y++)
		{
			for(x=0;x<m_sizex;x++)
			{
				var maptile = new aMapTile();
				maptile.posX=x*64;
				maptile.posY=y*64;
				// set classes in parsegml.
				maptile.UPDATE();	// update needs to be called once to set html.
				m_maptiles.push(maptile);
			}
		}
		m_somethingchanged=true;
		log("[Good] Map Initialized");
	}
	
	
	var m_time = 0.0;
	var m_tilechangetime = 0.6;
	this.UPDATE=function(deltatime)
	{
		m_time+=deltatime;
		if(m_time>m_tilechangetime)
		{
			m_time=0;
			m_somethingchanged = true;
			for(var i=0;i<m_maptiles.length;i++)
				m_maptiles[i].SWITCHTILE();			
		}
		
		if(m_somethingchanged==false)
			return;
					
		for(var i=0;i<m_maptiles.length;i++)
			m_maptiles[i].UPDATE(deltatime);
		m_somethingchanged = false;
	}
	
	this.RENDER=function()
	{
		var html;
		for(var i=0;i<m_maptiles.length;i++)
		{
			m_maptiles[i].RENDER();
		}
	}
}

