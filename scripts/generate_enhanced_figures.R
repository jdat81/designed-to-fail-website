# ============================================================================
# Enhanced Figure Generation Script for "Designed to Fail" Website
# Version: 2.0 - Publication Quality with Colorblind-Friendly Palettes
# Date: December 7, 2025
# ============================================================================

# Load required libraries
suppressPackageStartupMessages({
  library(tidyverse)
  library(maps)
  library(mapdata)
  library(mapproj)
  library(ggplot2)
  library(scales)
  library(viridis)
})

# Set output directory
output_dir <- "../public/images/figures/"
dir.create(output_dir, showWarnings = FALSE, recursive = TRUE)

# ============================================================================
# OKABE-ITO COLORBLIND-FRIENDLY PALETTE
# ============================================================================
okabe_ito <- list(
  orange = "#E69F00",
  skyblue = "#56B4E9",
  green = "#009E73",
  yellow = "#F0E442",
  blue = "#0072B2",
  vermilion = "#D55E00",
  purple = "#CC79A7",
  black = "#000000"
)

# Custom theme for all figures
theme_publication <- function(base_size = 12) {
  theme_minimal(base_size = base_size) +
    theme(
      plot.title = element_text(size = rel(1.3), face = "bold", hjust = 0.5,
                                margin = margin(b = 15), color = "#1a1a2e"),
      plot.subtitle = element_text(size = rel(1), hjust = 0.5,
                                   margin = margin(b = 10), color = "#4a4a4a"),
      axis.title = element_text(size = rel(0.95), face = "bold", color = "#2d2d2d"),
      axis.text = element_text(size = rel(0.9), color = "#3d3d3d"),
      legend.position = "bottom",
      legend.title = element_blank(),
      legend.text = element_text(size = rel(0.85)),
      panel.grid.major = element_line(color = "#e0e0e0", linewidth = 0.3),
      panel.grid.minor = element_blank(),
      plot.margin = margin(20, 25, 20, 20),
      plot.background = element_rect(fill = "white", color = NA),
      panel.background = element_rect(fill = "white", color = NA)
    )
}

# ============================================================================
# FIGURE 5.1: TERRITORIAL GROWTH 1775
# ============================================================================
generate_territory_1770 <- function() {
  message("Generating: 5-1-territories-1770.png")

  world_map <- map_data("world")
  states_map <- map_data("state")
  na_map <- world_map %>% filter(region %in% c("USA", "Canada", "Mexico"))

  thirteen_colonies <- c("new hampshire", "massachusetts", "rhode island", "connecticut",
                         "new york", "new jersey", "pennsylvania", "delaware", "maryland",
                         "virginia", "north carolina", "south carolina", "georgia")

  states_categorized <- states_map %>%
    mutate(region = tolower(region)) %>%
    mutate(category = case_when(
      region %in% thirteen_colonies ~ "Original Thirteen Colonies",
      region %in% c("maine", "vermont", "florida", "ohio", "indiana", "illinois",
                    "michigan", "wisconsin", "kentucky", "tennessee", "alabama",
                    "mississippi") ~ "Other British territories",
      TRUE ~ "Foreign areas"
    ))

  p <- ggplot() +
    geom_polygon(data = na_map, aes(x = long, y = lat, group = group),
                 fill = "#f5f5f5", color = "#9e9e9e", linewidth = 0.3) +
    geom_polygon(data = states_categorized %>% filter(category == "Original Thirteen Colonies"),
                 aes(x = long, y = lat, group = group),
                 fill = okabe_ito$blue, color = "#003d73", linewidth = 0.5, alpha = 0.85) +
    geom_polygon(data = states_categorized %>% filter(category == "Other British territories"),
                 aes(x = long, y = lat, group = group),
                 fill = okabe_ito$skyblue, color = "#2a6fa1", linewidth = 0.3, alpha = 0.7) +
    geom_polygon(data = states_categorized %>% filter(category == "Foreign areas"),
                 aes(x = long, y = lat, group = group),
                 fill = "#e8e8e8", color = "#b0b0b0", linewidth = 0.2) +
    coord_map("albers", lat0 = 39, lat1 = 45, xlim = c(-128, -66), ylim = c(22, 50)) +
    labs(title = "AMERICAN TERRITORIES, 1775",
         subtitle = "Original Thirteen Colonies") +
    annotate("rect", xmin = -127, xmax = -124.5, ymin = 24, ymax = 25.5,
             fill = okabe_ito$blue, color = "#003d73", linewidth = 0.5, alpha = 0.85) +
    annotate("text", x = -124, y = 24.75, label = "Thirteen Colonies", hjust = 0, size = 3.2, fontface = "bold") +
    annotate("rect", xmin = -127, xmax = -124.5, ymin = 22, ymax = 23.5,
             fill = okabe_ito$skyblue, color = "#2a6fa1", linewidth = 0.3, alpha = 0.7) +
    annotate("text", x = -124, y = 22.75, label = "British Territories", hjust = 0, size = 3.2) +
    annotate("text", x = -70, y = 24, label = "1775", size = 6, fontface = "bold", color = okabe_ito$blue) +
    theme_void() +
    theme(
      plot.title = element_text(size = 18, face = "bold", hjust = 0.5, color = "#1a1a2e", margin = margin(b = 5)),
      plot.subtitle = element_text(size = 13, hjust = 0.5, color = "#4a4a4a", margin = margin(b = 15)),
      plot.margin = margin(20, 20, 20, 20)
    )

  ggsave(paste0(output_dir, "5-1-territories-1770.png"), p, width = 11, height = 7, dpi = 150, bg = "white")
}

# ============================================================================
# FIGURE 5.2: TERRITORIAL GROWTH 1800
# ============================================================================
generate_territory_1800 <- function() {
  message("Generating: 5-2-territories-1800.png")

  world_map <- map_data("world")
  states_map <- map_data("state")
  na_map <- world_map %>% filter(region %in% c("USA", "Canada", "Mexico"))

  free_states_1800 <- c("new hampshire", "massachusetts", "rhode island", "connecticut",
                        "vermont", "new york", "new jersey", "pennsylvania")
  slave_states_1800 <- c("delaware", "maryland", "virginia", "north carolina",
                         "south carolina", "georgia", "kentucky", "tennessee")
  free_territories_1800 <- c("ohio", "indiana", "illinois", "michigan", "wisconsin")
  slave_territories_1800 <- c("mississippi", "alabama")

  states_categorized <- states_map %>%
    mutate(region = tolower(region)) %>%
    mutate(category = case_when(
      region %in% free_states_1800 ~ "Free States",
      region %in% slave_states_1800 ~ "Slave States",
      region %in% free_territories_1800 ~ "Free Territories",
      region %in% slave_territories_1800 ~ "Slave Territories",
      TRUE ~ "Other countries"
    ))

  p <- ggplot() +
    geom_polygon(data = na_map, aes(x = long, y = lat, group = group),
                 fill = "#f5f5f5", color = "#9e9e9e", linewidth = 0.3) +
    geom_polygon(data = states_categorized %>% filter(category == "Free States"),
                 aes(x = long, y = lat, group = group),
                 fill = okabe_ito$blue, color = "#003d73", linewidth = 0.5, alpha = 0.85) +
    geom_polygon(data = states_categorized %>% filter(category == "Slave States"),
                 aes(x = long, y = lat, group = group),
                 fill = okabe_ito$vermilion, color = "#8b3a00", linewidth = 0.5, alpha = 0.85) +
    geom_polygon(data = states_categorized %>% filter(category == "Free Territories"),
                 aes(x = long, y = lat, group = group),
                 fill = okabe_ito$skyblue, color = "#2a6fa1", linewidth = 0.4, alpha = 0.7) +
    geom_polygon(data = states_categorized %>% filter(category == "Slave Territories"),
                 aes(x = long, y = lat, group = group),
                 fill = okabe_ito$orange, color = "#b37700", linewidth = 0.4, alpha = 0.7) +
    geom_polygon(data = states_categorized %>% filter(category == "Other countries"),
                 aes(x = long, y = lat, group = group),
                 fill = "#e8e8e8", color = "#b0b0b0", linewidth = 0.2) +
    coord_map("albers", lat0 = 39, lat1 = 45, xlim = c(-128, -66), ylim = c(22, 50)) +
    labs(title = "AMERICAN TERRITORIES, 1800",
         subtitle = "Free and Slave States/Territories") +
    # Territory labels
    annotate("text", x = -100, y = 40, label = "Louisiana\n(Spain)", size = 2.8, fontface = "italic", color = "#666") +
    annotate("text", x = -82, y = 28, label = "FL\n(Spain)", size = 2.2, fontface = "italic", color = "#666") +
    # Legend
    annotate("rect", xmin = -127, xmax = -124.5, ymin = 27, ymax = 28.5,
             fill = okabe_ito$blue, alpha = 0.85, color = "#003d73") +
    annotate("text", x = -124, y = 27.75, label = "Free States", hjust = 0, size = 3) +
    annotate("rect", xmin = -127, xmax = -124.5, ymin = 25, ymax = 26.5,
             fill = okabe_ito$vermilion, alpha = 0.85, color = "#8b3a00") +
    annotate("text", x = -124, y = 25.75, label = "Slave States", hjust = 0, size = 3) +
    annotate("rect", xmin = -127, xmax = -124.5, ymin = 23, ymax = 24.5,
             fill = okabe_ito$skyblue, alpha = 0.7, color = "#2a6fa1") +
    annotate("text", x = -124, y = 23.75, label = "Free Territories", hjust = 0, size = 3) +
    annotate("rect", xmin = -127, xmax = -124.5, ymin = 21, ymax = 22.5,
             fill = okabe_ito$orange, alpha = 0.7, color = "#b37700") +
    annotate("text", x = -124, y = 21.75, label = "Slave Territories", hjust = 0, size = 3) +
    annotate("text", x = -70, y = 24, label = "1800", size = 6, fontface = "bold", color = okabe_ito$blue) +
    theme_void() +
    theme(
      plot.title = element_text(size = 18, face = "bold", hjust = 0.5, color = "#1a1a2e", margin = margin(b = 5)),
      plot.subtitle = element_text(size = 13, hjust = 0.5, color = "#4a4a4a", margin = margin(b = 15)),
      plot.margin = margin(20, 20, 20, 20)
    )

  ggsave(paste0(output_dir, "5-2-territories-1800.png"), p, width = 11, height = 7, dpi = 150, bg = "white")
}

# ============================================================================
# FIGURE 5.3: TERRITORIAL GROWTH 1809
# ============================================================================
generate_territory_1809 <- function() {
  message("Generating: 5-3-territories-1809.png")

  world_map <- map_data("world")
  states_map <- map_data("state")
  na_map <- world_map %>% filter(region %in% c("USA", "Canada", "Mexico"))

  states_1809 <- c("new hampshire", "massachusetts", "rhode island", "connecticut",
                   "vermont", "new york", "new jersey", "pennsylvania", "delaware",
                   "maryland", "virginia", "north carolina", "south carolina",
                   "georgia", "kentucky", "tennessee", "ohio")
  territories_1809 <- c("louisiana", "missouri", "arkansas", "illinois", "indiana",
                        "michigan", "wisconsin", "mississippi", "alabama")

  states_categorized <- states_map %>%
    mutate(region = tolower(region)) %>%
    mutate(category = case_when(
      region %in% states_1809 ~ "States",
      region %in% territories_1809 ~ "Territories",
      TRUE ~ "Other countries"
    ))

  p <- ggplot() +
    geom_polygon(data = na_map, aes(x = long, y = lat, group = group),
                 fill = "#f0f0f0", color = "#9e9e9e", linewidth = 0.3) +
    geom_polygon(data = states_categorized %>% filter(category == "States"),
                 aes(x = long, y = lat, group = group),
                 fill = okabe_ito$blue, color = "#003d73", linewidth = 0.5, alpha = 0.85) +
    geom_polygon(data = states_categorized %>% filter(category == "Territories"),
                 aes(x = long, y = lat, group = group),
                 fill = okabe_ito$green, color = "#006b4f", linewidth = 0.4, alpha = 0.75) +
    geom_polygon(data = states_categorized %>% filter(category == "Other countries"),
                 aes(x = long, y = lat, group = group),
                 fill = "#e8e8e8", color = "#b0b0b0", linewidth = 0.2) +
    coord_map("albers", lat0 = 39, lat1 = 45, xlim = c(-128, -66), ylim = c(22, 50)) +
    labs(title = "STATES AND TERRITORIES, 1809",
         subtitle = "After the Louisiana Purchase") +
    # Territory labels
    annotate("text", x = -100, y = 43, label = "Louisiana\nTerritory", size = 3, fontface = "bold", color = "#006b4f") +
    annotate("text", x = -110, y = 35, label = "New Spain\n(Spain)", size = 2.8, fontface = "italic", color = "#666") +
    annotate("text", x = -82, y = 28, label = "Florida\n(Spain)", size = 2.5, fontface = "italic", color = "#666") +
    # Legend
    annotate("rect", xmin = -70, xmax = -68.5, ymin = 43, ymax = 44.5,
             fill = okabe_ito$blue, alpha = 0.85, color = "#003d73") +
    annotate("text", x = -68, y = 43.75, label = "States", hjust = 0, size = 3.2, fontface = "bold") +
    annotate("rect", xmin = -70, xmax = -68.5, ymin = 40.5, ymax = 42,
             fill = okabe_ito$green, alpha = 0.75, color = "#006b4f") +
    annotate("text", x = -68, y = 41.25, label = "Territories", hjust = 0, size = 3.2) +
    annotate("rect", xmin = -70, xmax = -68.5, ymin = 38, ymax = 39.5,
             fill = "#e8e8e8", color = "#b0b0b0") +
    annotate("text", x = -68, y = 38.75, label = "Foreign", hjust = 0, size = 3.2) +
    annotate("text", x = -70, y = 24, label = "1809", size = 6, fontface = "bold", color = okabe_ito$green) +
    theme_void() +
    theme(
      plot.title = element_text(size = 18, face = "bold", hjust = 0.5, color = "#1a1a2e", margin = margin(b = 5)),
      plot.subtitle = element_text(size = 13, hjust = 0.5, color = "#4a4a4a", margin = margin(b = 15)),
      plot.margin = margin(20, 20, 20, 20)
    )

  ggsave(paste0(output_dir, "5-3-territories-1809.png"), p, width = 11, height = 7, dpi = 150, bg = "white")
}

# ============================================================================
# FIGURE 5.4: TERRITORIAL GROWTH 1850
# ============================================================================
generate_territory_1850 <- function() {
  message("Generating: 5-4-territories-1850.png")

  world_map <- map_data("world")
  states_map <- map_data("state")
  na_map <- world_map %>% filter(region %in% c("USA", "Canada", "Mexico"))

  states_1850 <- c("maine", "new hampshire", "massachusetts", "rhode island", "connecticut",
                   "vermont", "new york", "new jersey", "pennsylvania", "delaware",
                   "maryland", "virginia", "north carolina", "south carolina",
                   "georgia", "florida", "alabama", "mississippi", "louisiana",
                   "kentucky", "tennessee", "ohio", "indiana", "illinois", "michigan",
                   "wisconsin", "iowa", "missouri", "arkansas", "texas", "california")
  territories_1850 <- c("oregon", "washington", "minnesota", "north dakota", "south dakota",
                        "montana", "idaho", "wyoming", "utah", "nevada", "colorado",
                        "kansas", "nebraska", "oklahoma", "new mexico", "arizona")

  states_categorized <- states_map %>%
    mutate(region = tolower(region)) %>%
    mutate(category = case_when(
      region %in% states_1850 ~ "States",
      region %in% territories_1850 ~ "Territories",
      TRUE ~ "Other countries"
    ))

  p <- ggplot() +
    geom_polygon(data = na_map, aes(x = long, y = lat, group = group),
                 fill = "#f0f0f0", color = "#9e9e9e", linewidth = 0.3) +
    geom_polygon(data = states_categorized %>% filter(category == "States"),
                 aes(x = long, y = lat, group = group),
                 fill = okabe_ito$blue, color = "#003d73", linewidth = 0.5, alpha = 0.85) +
    geom_polygon(data = states_categorized %>% filter(category == "Territories"),
                 aes(x = long, y = lat, group = group),
                 fill = okabe_ito$orange, color = "#b37700", linewidth = 0.4, alpha = 0.75) +
    geom_polygon(data = states_categorized %>% filter(category == "Other countries"),
                 aes(x = long, y = lat, group = group),
                 fill = "#e8e8e8", color = "#b0b0b0", linewidth = 0.2) +
    coord_map("albers", lat0 = 39, lat1 = 45, xlim = c(-128, -66), ylim = c(22, 50)) +
    labs(title = "STATES AND TERRITORIES, 1850",
         subtitle = "Continental Expansion Complete") +
    # Territory labels
    annotate("text", x = -112, y = 40, label = "Utah\nTerr.", size = 2.8, fontface = "bold", color = "#b37700") +
    annotate("text", x = -107, y = 34, label = "New Mexico\nTerr.", size = 2.8, fontface = "bold", color = "#b37700") +
    annotate("text", x = -122, y = 44, label = "Oregon\nTerr.", size = 2.8, fontface = "bold", color = "#b37700") +
    annotate("text", x = -100, y = 42, label = "Unorganized", size = 2.5, fontface = "bold", color = "#b37700") +
    # Legend
    annotate("rect", xmin = -70, xmax = -68.5, ymin = 43, ymax = 44.5,
             fill = okabe_ito$blue, alpha = 0.85, color = "#003d73") +
    annotate("text", x = -68, y = 43.75, label = "States (31)", hjust = 0, size = 3.2, fontface = "bold") +
    annotate("rect", xmin = -70, xmax = -68.5, ymin = 40.5, ymax = 42,
             fill = okabe_ito$orange, alpha = 0.75, color = "#b37700") +
    annotate("text", x = -68, y = 41.25, label = "Territories", hjust = 0, size = 3.2) +
    annotate("text", x = -70, y = 24, label = "1850", size = 6, fontface = "bold", color = okabe_ito$orange) +
    theme_void() +
    theme(
      plot.title = element_text(size = 18, face = "bold", hjust = 0.5, color = "#1a1a2e", margin = margin(b = 5)),
      plot.subtitle = element_text(size = 13, hjust = 0.5, color = "#4a4a4a", margin = margin(b = 15)),
      plot.margin = margin(20, 20, 20, 20)
    )

  ggsave(paste0(output_dir, "5-4-territories-1850.png"), p, width = 11, height = 7, dpi = 150, bg = "white")
}

# ============================================================================
# FIGURE 5.5: MINERAL PRODUCTION (VIRIDIS PALETTE)
# ============================================================================
generate_minerals_chart <- function() {
  message("Generating: 5-5-minerals-1913.png")

  data <- data.frame(
    Mineral = c("Natural Gas", "Petroleum", "Copper", "Phosphate", "Coal",
                "Molybdenum", "Bauxite", "Zinc", "Iron Ore", "Lead",
                "Silver", "Salt", "Gold", "Tungsten"),
    Percent = c(95, 65, 56, 43, 39, 38, 37, 37, 36, 34, 30, 20, 20, 17)
  )

  # Create viridis-based color assignment
  data <- data %>%
    mutate(fill_color = viridis(14, option = "D")[rank(-Percent)])

  p <- ggplot(data, aes(x = Percent, y = reorder(Mineral, Percent))) +
    geom_bar(stat = "identity", aes(fill = Percent), color = "white", linewidth = 0.3) +
    scale_fill_viridis_c(option = "D", direction = -1, begin = 0.1, end = 0.9) +
    geom_text(aes(label = paste0(Percent, "%")), hjust = -0.15,
              color = "#2d2d2d", size = 3.8, fontface = "bold") +
    theme_publication() +
    theme(
      legend.position = "none",
      panel.grid.major.y = element_blank(),
      axis.text.y = element_text(face = "bold", size = 11),
      plot.title = element_text(size = 16),
      plot.subtitle = element_text(size = 12)
    ) +
    labs(
      title = "U.S. Mineral Production as % of World Output (1913)",
      subtitle = "America's Dominance in Natural Resources",
      x = "Percent of World Output",
      y = NULL
    ) +
    scale_x_continuous(limits = c(0, 110), breaks = seq(0, 100, by = 20), expand = c(0, 0))

  ggsave(paste0(output_dir, "5-5-minerals-1913.png"), p, width = 10, height = 7, dpi = 150, bg = "white")
}

# ============================================================================
# FIGURE 8.1: TRUST DECLINE (VERMILION/ORANGE GRADIENT)
# ============================================================================
generate_trust_decline <- function() {
  message("Generating: 8-1-trust-decline.png")

  trust_data <- data.frame(
    year = c(1958, 1964, 1966, 1968, 1970, 1972, 1974, 1976, 1978),
    trust_pct = c(73, 77, 65, 61, 54, 53, 36, 34, 30)
  )

  presidents <- data.frame(
    name = c("Eisenhower", "Kennedy", "Johnson", "Nixon", "Ford", "Carter"),
    start_year = c(1958, 1961, 1963, 1969, 1974, 1977),
    end_year = c(1961, 1963, 1969, 1974, 1977, 1981),
    party = c("R", "D", "D", "R", "R", "D")
  )

  p <- ggplot(trust_data, aes(x = year, y = trust_pct)) +
    # Presidential terms - subtle background
    geom_rect(data = presidents %>% filter(party == "D"),
              aes(xmin = start_year, xmax = end_year, ymin = -Inf, ymax = Inf),
              fill = okabe_ito$skyblue, alpha = 0.15, inherit.aes = FALSE) +
    geom_rect(data = presidents %>% filter(party == "R"),
              aes(xmin = start_year, xmax = end_year, ymin = -Inf, ymax = Inf),
              fill = okabe_ito$vermilion, alpha = 0.08, inherit.aes = FALSE) +
    # Filled area under curve
    geom_ribbon(aes(ymin = 25, ymax = trust_pct), fill = okabe_ito$vermilion, alpha = 0.25) +
    # Main line
    geom_line(color = okabe_ito$vermilion, linewidth = 2.5) +
    geom_point(color = okabe_ito$vermilion, size = 5, fill = "white", shape = 21, stroke = 2) +
    # Data labels
    geom_text(aes(label = paste0(trust_pct, "%")), vjust = -1.8, size = 3.5,
              fontface = "bold", color = okabe_ito$vermilion) +
    # Event annotations
    annotate("segment", x = 1963, xend = 1963, y = 25, yend = 77,
             linetype = "dashed", color = "#666", linewidth = 0.5) +
    annotate("text", x = 1963, y = 22, label = "JFK", size = 3, color = "#555", fontface = "bold") +
    annotate("segment", x = 1968, xend = 1968, y = 25, yend = 61,
             linetype = "dashed", color = "#666", linewidth = 0.5) +
    annotate("text", x = 1968, y = 22, label = "MLK/RFK", size = 3, color = "#555", fontface = "bold") +
    annotate("segment", x = 1974, xend = 1974, y = 25, yend = 36,
             linetype = "dashed", color = "#666", linewidth = 0.5) +
    annotate("text", x = 1974, y = 22, label = "Watergate", size = 3, color = "#555", fontface = "bold") +
    scale_y_continuous(limits = c(18, 88), breaks = seq(20, 80, by = 20)) +
    scale_x_continuous(breaks = trust_data$year) +
    theme_publication() +
    theme(
      panel.grid.major.x = element_blank()
    ) +
    labs(
      title = "The Collapse of Trust in Government (1958-1978)",
      subtitle = "Percentage who trust the federal government 'just about always' or 'most of the time'",
      x = "Year", y = "Trust (%)"
    )

  ggsave(paste0(output_dir, "8-1-trust-decline.png"), p, width = 12, height = 7, dpi = 150, bg = "white")
}

# ============================================================================
# FIGURE 9.1: MEAN INCOME (VIRIDIS)
# ============================================================================
generate_mean_income <- function() {
  message("Generating: 9-1-mean-income.png")

  income_data <- data.frame(
    Year = rep(c(1968, 1978, 1988, 1998, 2008, 2018, 2023), 5),
    Group = rep(c("Bottom 20%", "Second 20%", "Middle 20%", "Fourth 20%", "Top 5%"), each = 7),
    Income = c(
      14000, 15000, 15500, 16000, 15500, 15000, 16000,
      32000, 35000, 37000, 40000, 41000, 42000, 44000,
      52000, 58000, 62000, 68000, 70000, 73000, 77000,
      75000, 85000, 95000, 108000, 115000, 125000, 133000,
      175000, 200000, 280000, 380000, 400000, 480000, 550000
    )
  )

  income_data$Group <- factor(income_data$Group,
                              levels = c("Bottom 20%", "Second 20%", "Middle 20%", "Fourth 20%", "Top 5%"))

  p <- ggplot(income_data, aes(x = Year, y = Income/1000, color = Group, group = Group)) +
    geom_line(linewidth = 1.8) +
    geom_point(size = 3) +
    scale_color_viridis_d(option = "D", begin = 0.1, end = 0.9) +
    scale_y_continuous(labels = scales::dollar_format(suffix = "K")) +
    theme_publication() +
    theme(
      legend.position = "bottom",
      legend.text = element_text(size = 10)
    ) +
    labs(
      title = "Mean Household Income by Quintile (1968-2023)",
      subtitle = "The Great Divergence in American Incomes",
      x = "Year", y = "Mean Income"
    )

  ggsave(paste0(output_dir, "9-1-mean-income.png"), p, width = 12, height = 8, dpi = 150, bg = "white")
}

# ============================================================================
# FIGURE 9.2: SHARE OF INCOME
# ============================================================================
generate_share_income <- function() {
  message("Generating: 9-2-share-income.png")

  share_data <- data.frame(
    Year = rep(c(1968, 1978, 1988, 1998, 2008, 2018, 2023), 4),
    Group = rep(c("Bottom 20%", "Middle 60%", "Top 20%", "Top 5%"), each = 7),
    Share = c(
      4.2, 4.3, 3.8, 3.6, 3.4, 3.1, 3.0,
      52.3, 52.4, 49.7, 47.2, 45.8, 44.2, 43.5,
      43.5, 43.3, 46.5, 49.2, 50.8, 52.7, 53.5,
      17.4, 16.8, 18.3, 21.4, 21.5, 23.1, 24.2
    )
  )

  share_colors <- c("Bottom 20%" = okabe_ito$purple, "Middle 60%" = okabe_ito$blue,
                    "Top 20%" = okabe_ito$orange, "Top 5%" = okabe_ito$vermilion)

  share_data$Group <- factor(share_data$Group, levels = names(share_colors))

  p <- ggplot(share_data, aes(x = Year, y = Share, color = Group, group = Group)) +
    geom_line(linewidth = 1.8) +
    geom_point(size = 3) +
    scale_color_manual(values = share_colors) +
    scale_y_continuous(labels = function(x) paste0(x, "%")) +
    theme_publication() +
    theme(
      legend.position = "bottom"
    ) +
    labs(
      title = "Share of Total Household Income (1968-2023)",
      subtitle = "Rising Inequality: Top Gains as Bottom and Middle Decline",
      x = "Year", y = "Share of Total Income"
    )

  ggsave(paste0(output_dir, "9-2-share-income.png"), p, width = 12, height = 8, dpi = 150, bg = "white")
}

# ============================================================================
# FIGURE 9.3: WEALTH SHARE
# ============================================================================
generate_wealth_share <- function() {
  message("Generating: 9-3-wealth-share.png")

  wealth_data <- data.frame(
    Year = rep(c(1990, 2000, 2010, 2020, 2024), 3),
    Group = rep(c("Top 1%", "Top 10%", "Bottom 50%"), each = 5),
    Share = c(
      23, 30, 31, 32, 30,
      60, 66, 67, 69, 67,
      4, 3, 2, 2, 2
    )
  )

  wealth_colors <- c("Top 1%" = okabe_ito$vermilion, "Top 10%" = okabe_ito$orange,
                     "Bottom 50%" = okabe_ito$blue)

  wealth_data$Group <- factor(wealth_data$Group, levels = names(wealth_colors))

  p <- ggplot(wealth_data, aes(x = Year, y = Share, color = Group, group = Group)) +
    geom_line(linewidth = 2) +
    geom_point(size = 4) +
    scale_color_manual(values = wealth_colors) +
    scale_y_continuous(labels = function(x) paste0(x, "%"), limits = c(0, 75)) +
    theme_publication() +
    theme(
      legend.position = "bottom"
    ) +
    labs(
      title = "Share of Total Household Wealth (1990-2024)",
      subtitle = "Extreme Wealth Concentration: Top 10% Holds ~67% of All Wealth",
      x = "Year", y = "Share of Total Wealth"
    )

  ggsave(paste0(output_dir, "9-3-wealth-share.png"), p, width = 12, height = 8, dpi = 150, bg = "white")
}

# ============================================================================
# FIGURE 10.1: WALMART GROWTH
# ============================================================================
generate_walmart_growth <- function() {
  message("Generating: 10-1-wal-growth.png")

  walmart_data <- data.frame(
    Year = c(1962, 1967, 1970, 1972, 1975, 1980, 1985, 1990, 1995, 2000, 2005),
    Stores = c(1, 24, 32, 51, 125, 276, 882, 1528, 2943, 4189, 6141)
  )

  p <- ggplot(walmart_data, aes(x = Year, y = Stores)) +
    geom_area(fill = okabe_ito$blue, alpha = 0.3) +
    geom_line(color = okabe_ito$blue, linewidth = 2) +
    geom_point(color = okabe_ito$blue, size = 4, fill = "white", shape = 21, stroke = 2) +
    geom_text(aes(label = scales::comma(Stores)), vjust = -1.2, size = 3.2, fontface = "bold", color = "#2d2d2d") +
    scale_y_continuous(labels = scales::comma, limits = c(0, 7000)) +
    theme_publication() +
    theme(
      panel.grid.major.x = element_blank()
    ) +
    labs(
      title = "Growth of Walmart (1962-2005)",
      subtitle = "From Single Store to Retail Empire: Exponential Expansion",
      x = "Year", y = "Number of Stores"
    )

  ggsave(paste0(output_dir, "10-1-wal-growth.png"), p, width = 11, height = 7, dpi = 150, bg = "white")
}

# ============================================================================
# FIGURE 10.2: WALMART GEOGRAPHIC EXPANSION
# ============================================================================
generate_walmart_map <- function() {
  message("Generating: 10-2-wal-maps.png")

  states_map <- map_data("state")

  # Origin point (Rogers, Arkansas)
  origin <- data.frame(long = -94.11, lat = 36.33, label = "Rogers, AR\n1962")

  # Expansion waves
  wave1 <- data.frame(
    long = c(-93, -95, -92, -94, -91, -90, -96, -94.5),
    lat = c(35, 36, 34, 33, 35, 36, 34, 37),
    wave = "1970s"
  )

  wave2 <- data.frame(
    long = c(-98, -88, -85, -100, -83, -87, -102, -80),
    lat = c(33, 35, 33, 38, 35, 32, 35, 34),
    wave = "1980s"
  )

  wave3 <- data.frame(
    long = c(-75, -118, -122, -112, -70, -78, -115, -105),
    lat = c(40, 34, 45, 40, 42, 38, 38, 45),
    wave = "1990s-2000s"
  )

  p <- ggplot() +
    geom_polygon(data = states_map, aes(x = long, y = lat, group = group),
                 fill = "#f5f5f5", color = "#cccccc", linewidth = 0.3) +
    geom_point(data = wave3, aes(x = long, y = lat),
               color = okabe_ito$skyblue, size = 3, alpha = 0.6) +
    geom_point(data = wave2, aes(x = long, y = lat),
               color = okabe_ito$green, size = 4, alpha = 0.75) +
    geom_point(data = wave1, aes(x = long, y = lat),
               color = okabe_ito$orange, size = 5, alpha = 0.85) +
    geom_point(data = origin, aes(x = long, y = lat),
               color = okabe_ito$vermilion, size = 8, shape = 18) +
    geom_text(data = origin, aes(x = long, y = lat - 3, label = label),
              size = 3.5, fontface = "bold", color = okabe_ito$vermilion) +
    coord_map("albers", lat0 = 39, lat1 = 45, xlim = c(-125, -68), ylim = c(25, 50)) +
    labs(title = "Walmart Geographic Expansion",
         subtitle = "From Arkansas to Nationwide: A Retail Revolution") +
    # Legend
    annotate("point", x = -123, y = 28, color = okabe_ito$vermilion, size = 5, shape = 18) +
    annotate("text", x = -121, y = 28, label = "Origin (1962)", hjust = 0, size = 3) +
    annotate("point", x = -123, y = 26.5, color = okabe_ito$orange, size = 4) +
    annotate("text", x = -121, y = 26.5, label = "1970s Expansion", hjust = 0, size = 3) +
    annotate("point", x = -105, y = 28, color = okabe_ito$green, size = 4) +
    annotate("text", x = -103, y = 28, label = "1980s Growth", hjust = 0, size = 3) +
    annotate("point", x = -105, y = 26.5, color = okabe_ito$skyblue, size = 3) +
    annotate("text", x = -103, y = 26.5, label = "1990s-2000s", hjust = 0, size = 3) +
    theme_void() +
    theme(
      plot.title = element_text(size = 18, face = "bold", hjust = 0.5, color = "#1a1a2e", margin = margin(b = 5)),
      plot.subtitle = element_text(size = 13, hjust = 0.5, color = "#4a4a4a", margin = margin(b = 15)),
      plot.margin = margin(20, 20, 20, 20)
    )

  ggsave(paste0(output_dir, "10-2-wal-maps.png"), p, width = 11, height = 7, dpi = 150, bg = "white")
}

# ============================================================================
# FIGURE 11.1: NATIONAL HOME PRICES
# ============================================================================
generate_housing_bubble <- function() {
  message("Generating: 11-1-national-home-prices.png")

  housing_data <- data.frame(
    Year = 2000:2010,
    Index = c(227, 244, 260, 283, 320, 360, 370, 355, 295, 257, 250)
  )

  p <- ggplot(housing_data, aes(x = Year, y = Index)) +
    # Crisis zone
    annotate("rect", xmin = 2007, xmax = 2010.5, ymin = 200, ymax = 400,
             fill = okabe_ito$vermilion, alpha = 0.12) +
    annotate("text", x = 2008.5, y = 390, label = "Financial Crisis",
             color = okabe_ito$vermilion, fontface = "bold", size = 4) +
    # Filled area
    geom_ribbon(aes(ymin = 200, ymax = Index), fill = okabe_ito$orange, alpha = 0.3) +
    geom_line(color = okabe_ito$orange, linewidth = 2.5) +
    geom_point(color = okabe_ito$orange, size = 5, fill = "white", shape = 21, stroke = 2) +
    # Peak marker
    geom_point(data = housing_data %>% filter(Year == 2006),
               color = okabe_ito$vermilion, size = 8) +
    annotate("text", x = 2006, y = 385, label = "Peak",
             color = okabe_ito$vermilion, fontface = "bold", size = 4) +
    scale_y_continuous(limits = c(200, 400)) +
    theme_publication() +
    labs(
      title = "U.S. National Home Price Index (2000-2010)",
      subtitle = "The Housing Bubble: Rise and Devastating Crash",
      x = "Year", y = "Home Price Index"
    )

  ggsave(paste0(output_dir, "11-1-national-home-prices.png"), p, width = 12, height = 7, dpi = 150, bg = "white")
}

# ============================================================================
# FIGURE 11.2: STATE HOME PRICES
# ============================================================================
generate_state_home_prices <- function() {
  message("Generating: 11-2-state-home-prices.png")

  state_data <- data.frame(
    Year = rep(2000:2005, 5),
    State = rep(c("Nevada", "Arizona", "Florida", "California", "Hawaii"), each = 6),
    Index = c(
      100, 110, 125, 150, 185, 235,
      100, 108, 120, 140, 170, 210,
      100, 107, 118, 138, 168, 205,
      100, 110, 125, 145, 175, 195,
      100, 105, 112, 125, 145, 170
    )
  )

  state_colors <- c("Nevada" = okabe_ito$vermilion, "Arizona" = okabe_ito$orange,
                    "Florida" = okabe_ito$yellow, "California" = okabe_ito$green,
                    "Hawaii" = okabe_ito$blue)

  state_data$State <- factor(state_data$State, levels = names(state_colors))

  p <- ggplot(state_data, aes(x = Year, y = Index, color = State, group = State)) +
    geom_line(linewidth = 2) +
    geom_point(size = 3.5) +
    scale_color_manual(values = state_colors) +
    theme_publication() +
    theme(
      legend.position = "bottom"
    ) +
    labs(
      title = "Top 5 States by Home Price Appreciation (2000-2005)",
      subtitle = "Bubble States: Greatest Gains, Greatest Eventual Losses",
      x = "Year", y = "Home Price Index (2000 = 100)"
    )

  ggsave(paste0(output_dir, "11-2-state-home-prices.png"), p, width = 11, height = 7, dpi = 150, bg = "white")
}

# ============================================================================
# FIGURE 11.3: WEALTH DISTRIBUTION 2025
# ============================================================================
generate_wealth_distribution_2025 <- function() {
  message("Generating: 11-3-wealth-distribution-2025.png")

  wealth_2025 <- data.frame(
    Category = factor(c("Top 1%", "Next 9%", "Next 40%", "Bottom 50%"),
                      levels = c("Top 1%", "Next 9%", "Next 40%", "Bottom 50%")),
    Share = c(30.3, 36.8, 30.2, 2.6)
  )

  wealth_colors <- c("Top 1%" = okabe_ito$vermilion, "Next 9%" = okabe_ito$orange,
                     "Next 40%" = okabe_ito$blue, "Bottom 50%" = okabe_ito$purple)

  p <- ggplot(wealth_2025, aes(x = Category, y = Share, fill = Category)) +
    geom_bar(stat = "identity", color = "white", linewidth = 0.8) +
    geom_text(aes(label = paste0(Share, "%")), vjust = -0.5, size = 5, fontface = "bold") +
    scale_fill_manual(values = wealth_colors) +
    scale_y_continuous(limits = c(0, 45), labels = function(x) paste0(x, "%")) +
    theme_publication() +
    theme(
      legend.position = "none",
      axis.text.x = element_text(size = 12, face = "bold"),
      panel.grid.major.x = element_blank()
    ) +
    labs(
      title = "Distribution of Household Wealth in the U.S. (Q1 2025)",
      subtitle = "Top 10% Holds 67% of All Wealth; Bottom 50% Holds Just 2.6%",
      x = NULL, y = "Share of Total Wealth"
    )

  ggsave(paste0(output_dir, "11-3-wealth-distribution-2025.png"), p, width = 11, height = 7, dpi = 150, bg = "white")
}

# ============================================================================
# FIGURE 11.4: INCOME SHARE BY TIER
# ============================================================================
generate_income_share_tiers <- function() {
  message("Generating: 11-4-income-share.png")

  income_tier_data <- data.frame(
    Year = rep(seq(1970, 2022, by = 4), 3),
    Tier = rep(c("Upper", "Middle", "Lower"), each = 14),
    Share = c(
      29, 30, 32, 34, 37, 40, 43, 45, 47, 48, 49, 50, 51, 52,
      62, 61, 59, 57, 54, 51, 48, 46, 44, 43, 42, 41, 40, 39,
      10, 10, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9
    )
  )

  tier_colors <- c("Upper" = okabe_ito$vermilion, "Middle" = okabe_ito$blue,
                   "Lower" = okabe_ito$purple)

  income_tier_data$Tier <- factor(income_tier_data$Tier, levels = names(tier_colors))

  p <- ggplot(income_tier_data, aes(x = Year, y = Share, color = Tier, group = Tier)) +
    geom_line(linewidth = 2) +
    geom_point(size = 2.5) +
    scale_color_manual(values = tier_colors) +
    scale_y_continuous(labels = function(x) paste0(x, "%")) +
    theme_publication() +
    theme(
      legend.position = "bottom"
    ) +
    labs(
      title = "Share of Total U.S. Household Income by Tier (1970-2022)",
      subtitle = "Upper Tier Gains as Middle and Lower Tiers Decline",
      x = "Year", y = "Share of Total Income"
    )

  ggsave(paste0(output_dir, "11-4-income-share.png"), p, width = 11, height = 7, dpi = 150, bg = "white")
}

# ============================================================================
# MAIN EXECUTION
# ============================================================================
main <- function() {
  message("\n========================================")
  message("  Enhanced Figure Generation Script")
  message("  Colorblind-Friendly Palettes")
  message("========================================\n")

  # Generate all figures
  generate_territory_1770()
  generate_territory_1800()
  generate_territory_1809()
  generate_territory_1850()
  generate_minerals_chart()
  generate_trust_decline()
  generate_mean_income()
  generate_share_income()
  generate_wealth_share()
  generate_walmart_growth()
  generate_walmart_map()
  generate_housing_bubble()
  generate_state_home_prices()
  generate_wealth_distribution_2025()
  generate_income_share_tiers()

  message("\n========================================")
  message("  All 15 figures generated successfully!")
  message(paste("  Output directory:", output_dir))
  message("========================================\n")
}

# Run the script
main()
