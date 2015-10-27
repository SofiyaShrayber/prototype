// conect: Grunt server settings
module.exports = {
    options: {
        port: 9000,
        livereload: 35729,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: '0.0.0.0'
    },
    dev: {
        options: {
            open: true,
            base: '<%= project.temp %>',
            livereload: true
        }
    },
    dist: {
        options: {
            open: true,
            base: '<%= project.dist %>',
            livereload: false
        }
    }
}
