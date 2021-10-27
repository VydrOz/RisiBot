# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.0.3] - 2021-10-27

### Added

- Commands :
    - `api {param}` testing a [basic api](https://jsonplaceholder.typicode.com/todos/1) call and multiple arguments handling
    - `bs {profile} {playerTag}` find brawlstars player data (wins,trophies, etc.)
- Modules :
    - [node-fetch](https://www.npmjs.com/package/node-fetch)
    - [discord.js-commando 0.12.2](https://www.npmjs.com/package/discord.js-commando)
    - [brawlstars 1.0.8](https://www.npmjs.com/package/brawlstars)

### Changed

- rename folder `ping` to `test`, 
    > this folder will contains some commands to test features like api call, command with multiple args, etc.
- Discord version (11.6.4 => 12.5.1)
- bot reply now use `embed` presentation,
- commands handling, now  using `discord.js-commando`
- replace local database `sqlite` by cloud database `mongoDb`

## [0.0.2] - 2020-11-18

### Added

- CHANGELOG.md
- LICENSE (MIT)

### Changed

- README.md
- Enmap version (5.8.0 => 5.8.2)

### Fixed

- package.json version (0.0.2)

## [0.0.1] - 2020-11-18

### Added

- Basic command system/ handling (folder arrange)
- Initial config / config system
- Data storage (like config for each guild)


[unreleased]: https://github.com/Vydro/RisiBot/releases/tag/v0.0.3...HEAD
[0.0.1]: https://github.com/Vydro/RisiBot/releases/tag/v0.0.1
[0.0.2]: https://github.com/Vydro/RisiBot/releases/tag/v0.0.2
[0.0.3]: https://github.com/Vydro/RisiBot/releases/tag/v0.0.3
