// clean: Empties folders to start fresh
module.exports = {
    dist: {
        files: [{
            dot: true,
            src: [
                '<%= project.temp %>',
                '<%= project.dist %>/*'
            ]
        }]
    },
    dev: {
        files: [{
            src: ['<%= project.temp %>']
        }]
    }
}