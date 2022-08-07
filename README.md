# Federation Helper Mastodon Bot

Based on the Please Caption bot for Mastodon
([account](https://botsin.space/@PleaseCaption)) ([source code](https://glitch.com/edit/#!/please-caption-mastodon)).
It is basically a stripped down version, only keeping the "follow for follow" functionality.

This bot attempts to be a helper for your statuses to reach an instance that has secure fetch (aka `AUTHORIZED_FETCH`
or "secure mode") enabled, by having them be federated to the instance the bot runs on.
This is intended as an alternative for setting up relays between instances, as this does not work for secure fetch.

## How does the bot work?

By recording a follow to your account, the instance will fetch your statuses, boosts, and other associated stuff
automatically.

## Who uses this bot?

Currently, it's just:

- [CatCatNya~ (catcatnya.com)](https://catcatnya.com/@FederationHelper).

You can expand this list by setting up this bot yourself and either
asking [@kescher@catcatnya.com](https://catcatnya.com/@kescher), or by opening an issue/Pull Request to this repo.

## Installing the bot

### Install dependencies

- install NodeJS, preferably the latest LTS version of it.
- install yarn.
- Run: <br><br>

```bash
yarn install
```

### Create a Mastodon application and get the access token

> You can do this from the settings in Mastodon. There's a 'Development' section. Give the bot at least read, write, and
> follow permissions.

### Add environment variables

+ `MASTODON_API_URL` is the URL for the instance you're on.
+ `MASTODON_ACCESS_TOKEN` is the access token from the previous step

### Hide the account's social graph (Optional, but recommended)

At /settings/profile, enable "Hide your social graph" if it's available. This will hide follows and followers of the bot
account.

### Run the bot

```bash
# See .env.example for the actual variable names and values
export EXAMPLE_VARIABLE='VALUE'
yarn start
```