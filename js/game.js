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

*/

var aPlayer = function()
{
	var me = this; // prevent sub functions from getting this-ed.
	var m_target = null;
	// lebenspunkte
	var LP = 12; // make hearts, not war. Zelda hearts.
	this.getLP = function() {return LP;}
	this.addLP = function(value) {LP+=value;return LP;}
	this.setLP = function(value) {LP=value;return LP;}
	// update function
	this.UPDATE = function()
	{
		//log("player looptick");
		me.think();
		me.move();
	}
	
	this.think = function()
	{
		if(m_target==null)
			m_target = me.getNextTarget();
	}
	
	this.getNextTarget = function()
	{
		m_target=1;
		log("GetNextTarget Dummy");
	}
}

var aGame = function()
{
	var m_players = [];
	var m_maxplayers = 1;
	this.INIT = function()
	{
		for(var i = 0;i<m_maxplayers;i++)
		{
			plr = new aPlayer();
			m_players.push(plr);
		}
	}
	
	this.UPDATE = function()
	{
		//log("looptick inside game");
		for(var i=0;i<m_maxplayers;i++)
		{
			p=m_players[i];
			p.UPDATE();
		}
	}
}
