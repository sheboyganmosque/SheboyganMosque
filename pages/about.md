---
layout: page
title: "{{ site.data.team_members.page_title }}"
subtitle: "{{ site.data.team_members.page_subtitle }}"
permalink: /about/
---

{% include leadership.html %}

<style>
.hover-shadow {
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}
.hover-shadow:hover {
  transform: translateY(-5px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}
</style>
