/*
 ___________________________
/                           \
| o        S' GIT         o |
|   Solothurn & Grenchen    |
|       Institutes of       |
| o   gaming Technology   o |
\___________________________/

by Benedict Jäggi @ MMXX

Basic game-engine functions:
	getDeltaTime gets the ticks (ms) since the last frame update.
	UPDATE -> call this after each frame.
*/

// general log function
var log = function(txt)
{
	console.log(txt);
}

// the game engine GE.
var GE = function() 
{
	var me = this; // prevent stuff from getting this'ed.
	this.m_deltatime;
	this.m_lastUpdate = Date.now();
	var m_myInterval = null;
	var m_updatefunction = null;

	this.getDeltaTime = function() {return m_deltatime;}
	this.INIT = function(updatefunc = null)
	{
		m_updatefunction = updatefunc;
		m_myInterval = setInterval(GE.tick,10);
		log("[ OK ] Game Engine GE initialized.")
	}
		
	this.RENDER = function()
	{
		// do the pageflip here.
	}
	
	this.UPDATE = function()
	{
		if(m_updatefunction!=null)
			m_updatefunction(me.m_deltatime)
	}
}

g_gameengine = GE = new GE();
GE.getDeltaTime = function() {return g_gameengine.getDeltaTime();}
GE.tick = function() 
{
	var now = Date.now();
  	g_gameengine.m_deltatime = (now - g_gameengine.m_lastUpdate)*0.001;
    	g_gameengine.m_lastUpdate = now;
    	g_gameengine.UPDATE(g_gameengine.m_deltatime);
    	g_gameengine.RENDER(g_gameengine.m_deltatime);
}

