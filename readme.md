
# pwm

**(not ready for use yet)**

`pwm` is a command-line module manager for [ProcessWire](https://github.com/ryancramerdesign/ProcessWire). I’m writing it so that I don’t have to check third-party modules into source control anymore. I basically want an npm-like system for ProcessWire modules, where I can define my dependencies in a JSON file and pull them in whenever.


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

# does fuzzy search
$ pwm search mp3
  
  Audio_MP3: Creates a Field to store MP3-Audiofiles and…
  http://modules.processwire.com/modules/audio-mp3/

  LocalAudioFiles: The Local Audio Files DB is a combination…
  http://modules.processwire.com/modules/local-audio-files/
```

## (future) install
```sh
$ npm install -g pwm
```
