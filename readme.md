
# pwm
**(not ready for use yet)**

[![Build status](https://travis-ci.org/michaelrhodes/pwm.png?branch=master)](https://travis-ci.org/michaelrhodes/pwm)

`pwm` is a command-line module manager for [ProcessWire](https://github.com/ryancramerdesign/ProcessWire). I’m writing it so I don’t have to check third-party modules into source control anymore. Basically, I want an npm-like application that lets me define my dependencies in a JSON file and then pull them in whenever.

More tests are coming…

## usage
```sh
# installs to ./site/modules/{class-name}
$ pwm install ModulesManager PageImageManipulator

# uses semver versioning
$ pwm install MinifyHTML@1.0.1

# saves modules to ./module.json
$ pwm install --save ModulesManager
$ cat module.json
{
  "modules": {
    "ModulesManager": "~2.1.2"
  }
}

# uninstalls update ./module.json
$ pwm uninstall ModulesManager
$ cat module.json
{
  "modules": {}
}

# does fuzzy search
$ pwm search mp3
  Audio_MP3: Creates a Field to store MP3-Audiofiles and…
  LocalAudioFiles: The Local Audio Files DB is a combination…
```

## (future) install
```sh
$ npm install -g pwm
```

## (temporary/development) install
``` sh
$ npm install -g michaelrhodes/pwm
```
