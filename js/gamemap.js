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

var aGameMap = function()
{
	var me = this;
	var sizex = 20;
	var sizey = 20;
	
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
