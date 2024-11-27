---
title: Help Shape the Torrust 2025 Roadmap!
slug: help-shape-the-torrust-2025-roadmap
coverImage: /images/posts/help-shape-the-torrust-2025-roadmap/help-shape-the-torrust-2025-roadmap.webp
date: 2024-11-27T09:16:21.104Z
updated: 2024-11-27T09:16:21.104Z
excerpt: We're excited to invite the community to help define the Torrust 2025 roadmap by contributing ideas, feedback, and priorities in our open GitHub discussion.
contributor: Jose Celano
contributorSlug: jose-celano
tags:
  - Roadmap
  - Announcement
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
    { name: "Community Discussion Now Open on GitHub", id: "community-discussion-now-open-on-github" },
    { name: "Impact Mapping for Feature Requests", id: "impact-mapping-for-feature-requests" },
    { name: "Focus Areas for 2025", id: "focus-areas-for-2025" },
    { name: "Out-of-Scope for 2025 (But Under Discussion)", id: "out-of-scope-for-2025-but-under-discussion" },
    { name: "How to Get Involved", id: "how-to-get-involved" },
  ];

  let activeSection = '';
</script>

<PostContainer>
<PostTable>

## Table of contents

<TableOfContents {sections} {activeSection} />

</PostTable>

<PostBody>

## Introduction

As we prepare for an exciting year ahead, Torrust is inviting the community to join in defining the **2025 roadmap**. This is your opportunity to help shape the future of Torrust by contributing ideas and feedback on our priorities and focus areas. Collaboration has always been at the heart of Torrust, and we’re excited to work with you on this journey!

## Community Discussion Now Open on GitHub

We’ve started a [discussion on GitHub](https://github.com/orgs/torrust/discussions/19) to gather input from the community. Whether you’re a developer, user, or enthusiast, your feedback is invaluable in determining the next steps for Torrust. Share your ideas, provide suggestions, and help us prioritize the most impactful features.

## Impact Mapping for Feature Requests

To ensure all feature requests are well-organized and evaluated, we’ve created an [impact map](https://www.impactmapping.org/). This tool highlights the relevance and potential benefits of each feature, helping us focus on what truly matters to the community and the project’s goals.

<iframe width="768" height="432" src="https://miro.com/app/live-embed/uXjVL_SACr0=/?moveToViewport=-7817,-1260,14754,10654&embedId=711626446826" frameborder="0" scrolling="no" allow="fullscreen; clipboard-read; clipboard-write" allowfullscreen></iframe>

## Focus Areas for 2025

After reviewing and organizing all the issues in the main three repos (Tracker, Index and Index GUI) we conclude that there are three topics that are the main features requested by the community. In order of demand, starting from the most demanding features:

1. Customization: behavior and UI.
2. Statistics: especially related to users.
3. Community: give more visibility to users and extend things they can do. Currently users can only upload torrents.

There have been several factors to consider to define the draft roadmap:

1. We have collected and organized issues (impact map) to better establish the community interests.
2. We (core team) think there are some features/changes that need to be done (refactoring) before adding new features. Those tasks are not visible features sometimes, but they allow us to keep the code sustainable, what leads to a more efficient development in the future. Adding some complex features now could make implementing other features in the future harder.
3. We also take into consideration what motivates us.

Based on those points we’ve identified key areas to focus on in 2025:

### **1. Tracker Improvements**

- **Monitoring and Logging**: Providing better insights into tracker activity and performance.
- **Statistics**: Providing better statistics for tracker admins and in the long-term for the index to define user policies.
- **Resilience**: Exploring ways to make the tracker even more resilient, avoiding bad clients or limiting the resource consumption to make the tracker even more stable and robust.

### **2. Index Enhancements**

In the Index we have added two main epics:

- [**Administration**](https://github.com/torrust/torrust-index-gui/issues/657): Simplifying administration tasks.
- [**Self-Management Tools**](https://github.com/torrust/torrust-index-gui/issues/649): Empower users with greater control and flexibility.

Many of the issues in those epics are customization features requested by the community.

## Out-of-Scope for 2025 (But Under Discussion)

Some features are too large in scope for 2025, but we’re exploring steps toward them:

- Document Database Searching
- V2 Torrent Support
- Customizable Themes

If you are interesting in contributing to Torrust working on those topics, let us know by opening or joining discussions. We are open to support other developers interested in contributing to other parts not included in next year priorities.

## How to Get Involved

Here’s how you can participate in shaping the Torrust 2025 roadmap:

- Join the GitHub Discussion: Share your thoughts, suggest features, or comment on existing ideas.
- Review the Impact Map: Help us refine priorities by discussing the mapped-out features.
- Spread the Word: The more voices we have, the better the roadmap will reflect the community’s needs!

We look forward to working with you to make 2025 a landmark year for Torrust. Let’s build something amazing together!

</PostBody>
</PostContainer>
