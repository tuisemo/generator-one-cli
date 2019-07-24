'use strict';
const path = require('path');
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {
  initializing() {
    this.props = {
      name: 'react-webpack'
    };
  }
  // 接受用户输入
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the superb ${chalk.red('generator-one-cli')} generator!`
      )
    );

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Please input project name:',
        default: 'react-webpack'
      },
      {
        type: 'input',
        name: 'description',
        message: 'Please input project description:',
        default: 'a javascript plugin'
      },
      {
        type: 'input',
        name: 'main',
        message: 'Main file (index.js):',
        default: 'index.js'
      },
      {
        type: 'input',
        name: 'keywords',
        message: 'Package keywords (comma to split)',
        default: 'javascript,plugin'
      },
      {
        type: 'input',
        name: 'author',
        message: '"Author\'s Name"',
        default: ''
      },
      {
        type: 'input',
        name: 'email',
        message: '"Author\'s Email"',
        default: ''
      },
      {
        type: 'input',
        name: 'repository',
        message: 'Project homepage url',
        default: ''
      },
      {
        type: 'input',
        name: 'homepage',
        message: '"Author\'s Homepage"',
        default: ''
      },
      {
        type: 'input',
        name: 'license',
        message: 'License',
        default: 'MIT'
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }
  // 创建项目目录
  default() {
    if (path.basename(this.destinationPath()) !== this.props.name) {
      this.log(`\nYour generator must be inside a folder named
        ${this.props.name}\n
        I will automatically create this folder.\n`);

      mkdirp(this.props.name);
      this.destinationRoot(this.destinationPath(this.props.name));
    }
  }

  writing() {
    this.log('\nWriting...\n');
    this._writingBuild();
    this._writingMocks();
    this._writingPublic();
    this._writingSrc();
    this._writingGitignore();
    this._writingPrettier();
    this._writingBabelrc();
    this._writingPackageJSON();
  }
  // 以下划线_开头的是私有方法
  _writingPackageJSON() {
    // this.fs.copyTpl(from, to, context)
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      {
        name: this.props.name,
        description: this.props.description,
        keywords: this.props.keywords.split(','),
        author: this.props.author,
        email: this.props.email,
        repository: this.props.repository,
        homepage: this.props.homepage,
        license: this.props.license
      }
    );
  }
  _writingBuild() {
    this.fs.copyTpl(this.templatePath('build'), this.destinationPath('build'));
  }
  _writingMocks() {
    this.fs.copyTpl(this.templatePath('mocks'), this.destinationPath('mocks'));
  }
  _writingPublic() {
    this.fs.copy(this.templatePath('public'), this.destinationPath('public'));
  }
  _writingGitignore() {
    this.fs.copyTpl(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    );
  }
  _writingPrettier() {
    this.fs.copyTpl(
      this.templatePath('.prettierrc'),
      this.destinationPath('.prettierrc')
    );
    this.fs.copyTpl(
      this.templatePath('.prettierignore'),
      this.destinationPath('.prettierignore')
    );
  }
  _writingBabelrc() {
    this.fs.copyTpl(
      this.templatePath('babel.config.js'),
      this.destinationPath('babel.config.js')
    );
  }
  _writingSrc() {
    this.fs.copy(this.templatePath('src'), this.destinationPath('src'));
  }
  install() {
    // this.installDependencies();
    // 只安装bower依赖
    // this.bowerInstall();
    // 只安装npm组件
    this.npmInstall();
  }
};
