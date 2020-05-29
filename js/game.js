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


// ***************************** OLD

var aPlayer = function()
{
	var me = this; // prevent sub functions from getting this-ed.
	// lebenspunkte
	var LP = 12; // make hearts, not war. Zelda hearts.
	this.getLP = function() {return LP;}
	this.addLP = function(value) {LP+=value;return LP;}
	this.setLP = function(value) {LP=value;return LP;}
	
	var m_sprite = "agi";
	var m_classes = "sprite";
	var m_direction = "right";
	var m_dirFrame = 1;
	// update function
	this.UPDATE = function()
	{
		m_myclass = m_sprite+" "+m_classes+" "+m_direction+"_"+m_dirFrame;
	}
	
	this.RENDER=function(screen)
	{
		log("Rendering to "+screen);
		var elem='<div class="'+m_myclass+'" style="top: 10px; left: 10px;"></div>';
		$(screen).append(elem);
	}
}

var aGame = function()
{
	var m_players = [];
	var m_maxplayers = 1;
	var m_screen = 0;
	this.INIT = function(myscreen)
	{
		for(var i = 0;i<m_maxplayers;i++)
		{
			plr = new aPlayer();
			m_players.push(plr);
		}
		m_screen = myscreen;
	}
	
	this.UPDATE = function(deltatime)
	{
		$(m_screen).html("");
		//log("looptick inside game");
		for(var i=0;i<m_maxplayers;i++)
		{
			p=m_players[i];
			p.UPDATE();
			p.RENDER(m_screen);
		}
		
//		log("TAK");
	}
}
