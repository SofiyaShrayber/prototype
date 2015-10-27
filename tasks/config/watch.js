// watch: Watches files for changes and runs tasks based on the changed files
module.exports = {
    compass: {
        files: ['<%= project.src %>/**/<%= project.sass.files %>'],
        tasks: ['compass:<%= project.dir %>']
    },
    styles: {
        files: ['<%= project.src %>/**/<%= project.css.files %>'],
        tasks: ['newer:copy:<%= project.dir %>']
    },
    imgs: {
        files: ['<%= project.src %>/**/<%= project.img.files %>'],
        tasks: ['newer:copy:<%= project.dir %>']
    },
    livereload: {
        options: {
            livereload: '<%= connect.options.livereload %>'
        },
        files: [
            '<%= project.src %>/**/<%= project.html.files %>',
            '<%= project.temp %>/<%= project.css.files %>',
            '<%= project.temp %>/<%= project.img.files %>',
            '<%= project.src %>/**/<%= project.js.files %>'
        ],
        tasks: ['newer:copy:<%= project.dir %>']
    }
}
