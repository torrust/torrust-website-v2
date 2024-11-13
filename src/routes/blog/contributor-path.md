---
title: Contributor Path
slug: contributor-path
coverImage: /images/posts/contributor-path/rust-crab-going-safe-into-water.webp
date: 2024-10-29T09:20:51.608Z
updated: 2024-10-29T09:20:51.608Z
excerpt: Ready to contribute to Torrust? Here's your guide to get started and make meaningful contributions, from small fixes to full-fledged features.
contributor: Jose Celano
contributorSlug: jose-celano
tags:
  - Community
  - Onboarding
  - Contributors
hidden: false
---

<script>
  import Callout from "$lib/components/molecules/Callout.svelte";
  import CodeBlock from "$lib/components/molecules/CodeBlock.svelte";
  import Image from "$lib/components/atoms/Image.svelte";
  import PostBody from "$lib/components/molecules/PostBody.svelte";
  import PostContainer from "$lib/components/molecules/PostContainer.svelte";
  import PostTable from "$lib/components/molecules/PostTable.svelte";
  import TableOfContents from '$lib/components/atoms/TableOfContents.svelte';

  let sections = [
    { name: "Introduction", id: "introduction" },
    { name: "Minimum Requirements", id: "minimum-requirements" },
    { name: "Why Getting Started Can Be Challenging", id: "why-getting-started-can-be-challenging" },
    { name: "How Can You contribute", id: "how-can-you-contribute" },
    { name: "More Resources", id: "more-resources" },
  ]

  let activeSection = '';
</script>

<PostContainer>
<PostTable>

## Table of contents

<TableOfContents {sections} {activeSection} />

</PostTable>

<PostBody>

## Introduction

We’re thrilled to welcome new contributors to Torrust! While we’ve had many contributors over the last couple of years, we know that getting started can be challenging. That’s why we’re working hard to improve the onboarding experience by:

- Writing compressive documentation.
- Keeping the codebase as simple and clean as possible.
- Maintaining solid test coverage to make contributing feel safe and reliable.
- Supporting contributors with prompt help when they open issues or PRs.

Despite our efforts, we realize it can still be daunting for newcomers. This guide aims to help you navigate our projects and get you started on making meaningful contributions.

## Minimum Requirements

To start contributing to Torrust repositories, you should have basic knowledge of:

- **Git**: Our workflow requires signed commits, and we encourage commit messages to follow the [Conventional commits specification](https://www.conventionalcommits.org/en/v1.0.0/) specification.
- **Rust**: Many of our projects use Rust, but don’t worry if you're just getting started—our community is here to help.
- **GitHub**: Familiarity with GitHub is essential, as it’s where our collaboration happens.

If Rust isn’t your thing yet, that’s okay! We also have repositories that don’t require Rust knowledge, such as:

- The [Torrust Website](https://github.com/torrust/torrust-website)
- The [Index GUI](https://github.com/torrust/torrust-index-gui)

## Why Getting Started Can Be Challenging

Getting started doesn’t have to be hard, but we understand that some parts of the codebase can be intimidating at first. Here are a few reasons why it might seem challenging, and what you can do about it.

### Complex Project Structure

Some of our projects—like the Tracker—involve multiple services:

- **UDP Trackers** and **HTTP Trackers**.
- **REST** API for management.
- **Health Check API**.
- **Background Tasks** (e.g., cleaning torrents).

While this might sound complex, each service is relatively small and manageable on its own.

### Limited Pre-Defined Issues

Newcomers often prefer to tackle well-defined issues. However, many of our upcoming features are still in the discussion or planning phase. If you're interested in working on something specific but don't see an open issue, feel free to start a discussion or open a new issue!

### Package Structure

Our current package structure for the Tracker could be improved in terms of performance, reusability, and maintainability. We’ve had discussions about refactoring it to make contributions more approachable:

- [New app architecture](https://github.com/torrust/torrust-tracker/discussions/240)
- [Refactor packages](https://github.com/torrust/torrust-tracker/issues/753)

We believe smaller and independent packages will make it easier for contributors to work on specific components without needing to understand the entire codebase.

## How Can You contribute

There are many ways to contribute to Torrust, including:

- Fixing typos.
- Improving documentation.
- Proposing new features.
- Participating in discussions.
- Testing new releases.
- Reporting bugs.
- Writing blog posts.

However, this guide will focus on developers who want to contribute by coding. We can divide contributions into frontend (Nuxt + TypeScript) and backend (Rust). Let’s explore these paths separately.

### Frontend Development

There are two main repositories for frontend contributions:

- [Torrust Website](https://github.com/torrust/torrust-website): This is the organization site where this post is published. There are a lot of [things to improve](https://github.com/torrust/torrust-website/issues). The site is built with [SvelteKit](https://svelte.dev/docs/kit).
- [Torrust Index GUI](https://github.com/torrust/torrust-index-gui): This is the frontend for the Torrust Index.

Key technologies used:

- [Nuxt](https://nuxt.com/)
- [Vue 3](https://vuejs.org/)
- [Cypress](https://www.cypress.io/)

There are a lot of missing [basic functionality](https://github.com/torrust/torrust-index-gui/issues) there. Some of the areas that need contributions include:

- **Admin Panel**: Adding functionality for user management, categories, and tags.
- **Search Interface**: Improving how users interact with and filter search results.
- **Feature Configuration**: Making some features more configurable to adapt to different environments.

### Backend Development

We also have two main Rust repositories for backend contributions:

- [Torrust Tracker](https://github.com/torrust/torrust-tracker): A BitTorrent tracker that can be used independently of other applications.
- [Torrust Index](https://github.com/torrust/torrust-index): The backend for the Torrust Index, consisting of a REST API built using [Axum](https://github.com/tokio-rs/axum).

In general the Index is much simpler than the tracker. It's basically a REST API.

#### Torrust Index

The Torrust Index is simpler compared to the Tracker—primarily a REST API. Areas of recent development include:

- **Implementing New BEPs** (BitTorrent Enhancement Proposals)
- **Improving Administration** features for better usability.
- **Enhancing the Search Engine** for more efficient searching.

BEPs stand for [Bittorrent Enhancement Proposals](http://bittorrent.org/beps/bep_0000.html). THey are specifications for new features in the BitTorrent ecosystem. Many of them have not been implemented yet.

If you’re interested in Rust but don’t want to work on low-level BitTorrent protocols, focusing on REST API features is a great way to start.

If you are curious about how BitTorrent works under the hook these BEPs are usually easier to implement than the ones for the Tracker.

#### Torrust Tracker

The Tracker is a more complex project, mainly because it operates several services. However, you don’t need to understand every detail to get started.

<Callout type="info">

Notice: You don't need to understand all services and layers to start contributing. There are many components that can we improved independently.

</Callout>

Here’s a high-level overview:

- UDP trackers.
- HTTP trackers.
- A REST API.
- A health check API.
- A background task to clean torrents.

We’re using Axum for most of the HTTP-based services. The UDP tracker is a custom UDP server that uses some types from the aquatic crates.

If you're interested in the internal architecture, read through the [proposed architecture discussion](https://github.com/torrust/torrust-tracker/discussions/240).

Basically all services at the highest level (delivery layer) are HTTP or UDP service. Controllers call app services that call the main tracker service in the end. The tracker domain service is the core of the application and it has many responsibilities:

- Peers authentication and authorization (only for HTTP trackers)
- Whitelist: the tracker can run in `listed` mode when only some infohashes are allowed.
- Torrents: the core in-memory data structure which contains all the torrents info.

Areas where you can contribute include:

- Adding protocol features, such as <https://github.com/torrust/torrust-tracker/discussions/532>.
- Improving existing console tools that help test and debug.
- Extracting reusable packages to share with the Rust community.
- Improving statistics tracking, which is crucial for private trackers.
- [Working on performance improvements for critical components like the in-memory torrent repository.](https://github.com/torrust/torrust-tracker/discussions/774).
- Implementing new protocols, such as [webtorrent](https://github.com/torrust/torrust-tracker/discussions/138), to enable BitTorrent in the browser.

We will introduce some of them ordered starting from the simplest ones to the hardest ones. The hardest ones are not so difficult but they require a good knowledge of the BitTorrent protocols and therefore a bigger effort.

There are many small tasks related to the protocols like:

- <https://github.com/torrust/torrust-tracker/discussions/532>

That's an example of issue that would require you to only understand and `announce` request and the tracker configuration module.

We have generated three console commands that are really helpful for debugging but they could be also very useful in other projects. THey are:

- UDP Tracker client: a console client to make requests to UDP trackers.
- HTTP Tracker client: a console client to make requests to HTTP trackers.
- Tracker Checker: a console client to run checks against remote trackers services.

There is an [epic issue](https://github.com/torrust/torrust-tracker/issues/669) that contains a TODO list and a recommendation about how to proceed.

Those clients are also based on generic UDP and HTTP clients that could also be extracted into workspace packages to publish them as independent crates that other projects can benefit from.

Another very requested feature is to improve the statistics. Currently the tracker only tracks the list of peers and the number of downloads. However that not enough for private indexes. This is not an easy task because there are no consensus about wha the tracker should track. A first approach could be just adding the basic data and make it extensible and optional to add custom extra stats.

There are also many ideas about how to improve performance, specially in the core tracker torrent repository. This will require you a good understanding about Rust data types and concurrency restriction, but you don't need to know much about BitTorrent. Therefore it's a good choice for people that are good at this or are looking for learn more about creating Rust types with a high load. This is one of the main bottlenecks of the tracker.

Finally, there are many protocol extensions not implement yet. FOr example [webtorrent](https://webtorrent.io/) protocol. This enables a lot of cool projects running BitTorrent clients in the browser. Right now it's not possible to use the Torrust Tracker for those projects. THis feature requires a big effort to understand the protocol and implement it. There is not much information but at least there are other implementation in Rust (for example aquatic).

If you want to limit the scope maybe console clients and tracker clients are a good entrypoint to start learning about basic tracker requests. On the other hand, if you want to try a full new feature, webtorrent protocol could be the next big thing.

#### Other Projects

Apart from the two main applications we have also created other side projects related to BitTorrent:

- [bencode2json](https://github.com/torrust/bencode2json)
- [json2bencode](https://github.com/torrust/json2bencode)
- [hash2torrent](https://github.com/torrust/torrust-hash2torrent)

They are totally independent from the Index and Tracker. They might be a good way to introduce yourself into the BitTorrent. They are small projects that require a very basic knowledge about BitTorrent, and they are a good way to start learning about basic BitTorrent concepts like:

- Bencode format
- Infohash
- BitTorrent client

`bencode2json` and `json2bencode`are particularly good to start with as the scope if very small.

## More Resources

In our blog you will find tutorials like:

- [How To Setup The Dev Env](./how-to-setup-the-development-environment)

You can also open a new discussion or issues in all repos if there is something you would like to contribute with but you are not sure where to start from.

</PostBody>
</PostContainer>
