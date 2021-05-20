const discord = require('discord.js')
module.exports = {
	name: 'queue',
  category:'Music',
	description: 'List this server\'s queue',
  aliases:['q'],
	execute(client, message) {
		const serverQueue = client.queue.get(message.guild.id);
    function deniedEmbed(err) {
      const deniedEmbed = new discord.MessageEmbed()
      .setTitle('Error')
      .setDescription(err)
      .setThumbnail('https://images-ext-1.discordapp.net/external/9yiAQ7ZAI3Rw8ai2p1uGMsaBIQ1roOA4K-ZrGbd0P_8/https/cdn1.iconfinder.com/data/icons/web-essentials-circle-style/48/delete-512.png?width=461&height=461')
      .setColor('RED')
      .setTimestamp();
      return deniedEmbed
    }
		if (!serverQueue) return message.channel.send(deniedEmbed('There is no queue in this guild')).then(x => x.delete({timeout:5000}))
		if (serverQueue.connection.dispatcher.paused) var status = '⏸'; else var status = '▶️'
    let songslist = new Array()
    serverQueue.songs.forEach(song => {
      songslist[songslist.length] = `${song.title}, added by ${song.addedByUser.username}\n`
    })
    console.log(serverQueue.songs)
    const embed = new discord.MessageEmbed()
        .setTitle('Song Queue')
        .setColor('BLUE')
        .setDescription(songslist.join(''))
        .setTimestamp()
        .setAuthor('Aquacious Music', 'https://github.com/llsc12/Aquacious/raw/main/aicon.gif')
    message.channel.send(embed)
	},
};