---
title: 'Visualize Tracker Metrics with Prometheus and Grafana'
slug: 'visualize-tracker-metrics-prometheus-grafana'
coverImage: '/images/posts/visualize-tracker-metrics-prometheus-grafana/tracker-stats-visualized-with-grafana.webp'
date: 2024-12-13T11:43:34.921Z
updated: 2024-12-13T11:43:34.921Z
excerpt: "Learn how to set up Prometheus and Grafana to monitor the Torrust Tracker's performance metrics and contribute to shaping future enhancements."
contributor: Jose Celano
contributorSlug: jose-celano
tags:
  - Torrust Tracker
  - Prometheus
  - Grafana
  - Statistics
  - Community
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
    { name: "Setting Up Prometheus and Grafana", id: "setting-up-prometheus-and-grafana" },
    { name: "Visualizing Metrics", id: "visualizing-metrics" },
    { name: "Future Plans and Challenges", id: "future-plans-and-challenges" },
    { name: "Call for Community Input", id: "call-for-community-input" },
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

The Torrust Tracker has taken a significant leap forward with a newly added feature: the ability to export its statistics in the **Prometheus** format. This update enables admins to visualize tracker metrics seamlessly using **Grafana**. As this has been a highly requested feature, we’re excited to share its details and how you can set it up in your own environment.

With this addition, the Torrust Tracker provides better insights into its performance and behavior, paving the way for more informed decision-making and robust tracker management.

## Setting Up Prometheus and Grafana

To make the integration process as smooth as possible, we’ve updated the [Torrust Demo repository](https://github.com/torrust/torrust-demo) with the necessary **Docker Compose** configuration. By following the provided documentation, you can quickly set up a monitoring stack that includes Prometheus and Grafana.

We will not include instructions about how to install Prometheus and Grafana. Please follow the official documentation. We will only highlight some things to consider.

This is the new services added to the docker compose configuration we are using in the live demo:

<CodeBlock lang="yml">

```yml
grafana:
  image: grafana/grafana:11.4.0
  container_name: grafana
  restart: unless-stopped
  environment:
    - GF_SECURITY_ADMIN_USER=${GF_SECURITY_ADMIN_USER:-admin}
    - GF_SECURITY_ADMIN_PASSWORD=${GF_SECURITY_ADMIN_PASSWORD:-admin}
  networks:
    - backend_network
  ports:
    - '3100:3000'
  volumes:
    - grafana_data:/var/lib/grafana
  depends_on:
    - prometheus

prometheus:
  image: prom/prometheus:v3.0.1
  container_name: prometheus
  tty: true
  restart: unless-stopped
  networks:
    - backend_network
  ports:
    - '9090:9090' # This port should not be exposed to the internet
  volumes:
    - ./storage/prometheus/etc:/etc/prometheus:Z
  logging:
  options:
    max-size: '10m'
    max-file: '10'
  depends_on:
    - tracker

volumes:
  grafana_data: {}
```

</CodeBlock>

<Callout type="warning">

You have to provide a docker compose environment variable `GF_SECURITY_ADMIN_PASSWORD` with the password for the Grafana `admin` user.

</Callout>

The `Nginx` service was also changed a little bit to make sure it's started after the Grafana container. We need that to server Grafana via Nginx (to use HTTPs).

<CodeBlock lang="yml">

```yml
proxy:
  # The rest of the configuration is the same ...
  depends_on:
    - index-gui
    - index
    - tracker
    - grafana
```

</CodeBlock>

THe Prometheus configuration is very simple. We only need to set the Tracker URL.

<CodeBlock lang="yml">

```yml
global:
  scrape_interval: 15s # How often to scrape metrics

scrape_configs:
  - job_name: 'tracker_metrics'
    metrics_path: '/api/v1/stats'
    params:
      token: ['MyAccessToken']
      format: ['prometheus']
    static_configs:
      - targets: ['tracker:1212']
```

</CodeBlock>

<Callout type="warning">

Be aware Prometheus does not have authentication and the configuration includes the Tracker API token. To avoid exposing the token you need to close the Prometheus port (`9090`) in the server firewall.

</Callout>

If you want to setup [Grafana behind the Nginx proxy](https://grafana.com/tutorials/run-grafana-behind-a-proxy/) as we do you will also need to change the [Nginx configuration](https://github.com/torrust/torrust-demo/blob/main/share/container/default/config/nginx.conf).

Please, follow the latest [Grafana documentation for configuration using a reverse proxy](https://grafana.com/tutorials/run-grafana-behind-a-proxy/).

<Callout type="info">

To generate the Let's Encrypt certificate you will need to enable Grafana on port 80 temporarily. The process is the same as the one described in the [Deploying Torrust to Production](https://torrust.com/blog/deploying-torrust-to-production) blog post.

</Callout>

## Visualizing Metrics

Once the setup is complete, you’ll have access to essential tracker statistics. The stats are imported into Prometheus from the Tracker via the REST API.

Endpoint with the new format: <https://127.0.0.1/api/v1/stats?token=MyAccessToken&format=prometheus>

<CodeBlock lang="text">

```text
torrents 250966
seeders 71116
completed 3395
leechers 201896
tcp4_connections_handled 0
tcp4_announces_handled 0
tcp4_scrapes_handled 0
tcp6_connections_handled 0
tcp6_announces_handled 0
tcp6_scrapes_handled 0
udp4_connections_handled 2692635
udp4_announces_handled 7015031
udp4_scrapes_handled 129299
udp4_errors_handled 2418729
udp6_connections_handled 0
udp6_announces_handled 0
udp6_scrapes_handled 0
udp6_errors_handled 0
```

</CodeBlock>

[We are considering adding new metrics](https://github.com/torrust/torrust-tracker/issues/1128).

<Callout type="warning">

The new format for the endpoint is not yet stable. We could change the data returned by the endpoint in the Prometheus format

</Callout>

Some changes that might be introduced in the future are:

- Changing the names. See [recommendations](https://prometheus.io/docs/practices/naming/).
- Adding labels. See: [data model](https://prometheus.io/docs/concepts/data_model/).

Once Prometheus and Grafana are configured you can create new dashboards. These dashboards provide actionable insights to optimize tracker performance and identify potential issues.

Sample dashboard after running the demo tracker for 3 hours:

<Image src="/images/posts/visualize-tracker-metrics-prometheus-grafana/tracker-stats-visualized-with-grafana-dashboard.webp" alt="Sample dashboard in Grafana" />

## Future Plans and Challenges

While the current implementation is a step forward, we recognize the need for further enhancements:

1. **Adding More Metrics**: We’re actively working on expanding the range of metrics to provide even deeper insights into tracker operations.
2. **User-Specific Statistics**: Private trackers often require detailed user statistics, but integrating this with Prometheus and Grafana poses scalability challenges. Handling thousands of users with numerous stats per user could impact tracker performance and slow down data imports via the API.

### **Exploring Alternatives**

We’re exploring potential solutions to overcome these limitations, such as:

- Dedicated database systems for user statistics.
- Event-driven architectures to handle metrics in real-time.

We invite the community to share ideas and propose alternative approaches to ensure the tracker remains efficient and scalable.

## Call for Community Input

Your feedback is crucial in shaping the future of the Torrust Tracker. Here’s how you can get involved:

- **Join the Discussion**: Participate in our [GitHub discussions](https://github.com/torrust/torrust-tracker/discussions) to share your thoughts on improving [tracker statistics](https://github.com/torrust/torrust-tracker/discussions/820).
- **Propose Metrics**: Let us know what additional metrics would benefit you as a tracker admin.
- **Suggest Alternatives**: If you’re familiar with tools that could better handle large-scale user statistics, we want to hear about them.

Together, we can continue to enhance the Torrust Tracker and meet the evolving needs of our community. Let’s build a more robust and insightful tracker experience!

</PostBody>
</PostContainer>
