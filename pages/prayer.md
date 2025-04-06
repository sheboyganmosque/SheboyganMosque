---
layout: page
title: "Prayer"
subtitle: "Prayer information for Islamic Society of Sheboygan"
permalink: /prayer/
---

<script>
  // Make prayer times settings available to JavaScript
  window.siteData = {
    prayer_times: {{ site.data.prayer_times | jsonify }}
  };
</script>

<div class="prayer-times-section py-4">
  <div class="row mb-4">
    <div class="col-md-6">
      <div class="card h-100">
        <div class="card-header bg-primary text-white">
          <h3 class="card-title mb-0">Today's Prayer Times <small class="text-light">(Central Time)</small></h3>
        </div>
        <div class="card-body">
          <div class="today-date text-center mb-3">
            <h5 id="today-date-hijri">Loading Hijri date...</h5>
            <p id="today-date-gregorian">Loading date...</p>
          </div>
          <div class="alert alert-info mb-3 text-center small">
            <i class="fas fa-info-circle me-1"></i> Prayer times are calculated for Sheboygan, WI using the ISNA calculation method.
          </div>
          <table class="table prayer-times-table" id="prayer-times-table">
            <thead>
              <tr>
                <th>Prayer</th>
                <th>Time (CT)</th>
              </tr>
            </thead>
            <tbody>
              <!-- Prayer times will be populated by JavaScript -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="card h-100">
        <div class="card-header bg-primary text-white">
          <h3 class="card-title mb-0">Jumu'ah Prayer</h3>
        </div>
        <div class="card-body">
          <div class="jumu-ah-info text-center">
            <p class="lead">Friday Prayer (Jumu'ah)</p>
            {% for jumua in site.data.prayer_times.jumua_times %}
              <div class="jumua-time">
                <p>
                  <strong>{{ jumua.time }}</strong> at {{ jumua.location }}
                  {% if jumua.notes != "" %}
                    <br><small>{{ jumua.notes }}</small>
                  {% endif %}
                </p>
                <p>Khutbah starts promptly at {{ jumua.time }} followed by prayer.</p>
                <p>Please arrive early to secure a spot in the prayer hall.</p>
              </div>
            {% endfor %}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<script src="/assets/js/prayer-times.js"></script>
