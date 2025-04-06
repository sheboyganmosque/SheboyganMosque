---
layout: page
title: "Leadership"
subtitle: "Meet the Islamic Society of Sheboygan Leadership Team"
permalink: /about/
---

<div class="container py-4">
  <div class="row g-4">
    {% for member in site.data.team_members.members | sort: "order" %}
    <div class="col-md-6 col-lg-4">
      <div class="card h-100 border-0 shadow-sm hover-shadow transition">
        <div class="card-body p-4 text-center">
          <div class="mb-3">
            {% if member.photo %}
              <img src="{{ member.photo | relative_url }}" alt="{{ member.name }}" class="rounded-circle" style="width: 100px; height: 100px; object-fit: cover;">
            {% else %}
              <i class="fas fa-user-circle fa-3x text-primary"></i>
            {% endif %}
          </div>
          <h3 class="h5 fw-bold mb-2">{{ member.name }}</h3>
          <p class="text-muted mb-0">{{ member.position }}</p>
          {% if member.bio %}
          <div class="mt-3">
            <button class="btn btn-sm btn-outline-primary" type="button" data-bs-toggle="collapse" data-bs-target="#bio-{{ forloop.index }}" aria-expanded="false" aria-controls="bio-{{ forloop.index }}">
              Read Bio
            </button>
            <div class="collapse mt-2" id="bio-{{ forloop.index }}">
              <div class="card card-body">
                {{ member.bio | markdownify }}
              </div>
            </div>
          </div>
          {% endif %}
          {% if member.email or member.phone %}
          <div class="mt-3">
            {% if member.email %}
            <a href="mailto:{{ member.email }}" class="btn btn-sm btn-outline-primary me-2">
              <i class="fas fa-envelope"></i>
            </a>
            {% endif %}
            {% if member.phone %}
            <a href="tel:{{ member.phone }}" class="btn btn-sm btn-outline-primary">
              <i class="fas fa-phone"></i>
            </a>
            {% endif %}
          </div>
          {% endif %}
        </div>
      </div>
    </div>
    {% endfor %}
  </div>
</div>

<style>
.hover-shadow {
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}
.hover-shadow:hover {
  transform: translateY(-5px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}
</style>
