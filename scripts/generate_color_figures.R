# Generate Color Figures for "Designed to Fail" Website
# Run this script in R to generate colored PNG versions of book figures
# Output directory: website/public/images/figures/

library(tidyverse)
library(maps)
library(mapdata)
library(ggplot2)
library(scales)

# Set output directory
output_dir <- "../public/images/figures/"
dir.create(output_dir, showWarnings = FALSE, recursive = TRUE)

# Color theme for web display
web_colors <- list(
  primary = "#1e3a5f",      # Navy blue
  secondary = "#c9a227",    # Gold
  accent_red = "#b91c1c",   # Red
  blue = "#3b82f6",
  purple = "#8b5cf6",
  pink = "#ec4899",
  orange = "#f97316",
  green = "#22c55e",
  red = "#dc2626"
)

# =============================================================================
# FIGURE 5.1-5.4: TERRITORIAL EXPANSION MAPS
# =============================================================================

generate_territory_map <- function(year_config, filename) {
  world_map <- map_data("world")
  states_map <- map_data("state")

  na_map <- world_map %>%
    filter(region %in% c("USA", "Canada", "Mexico"))

  # Color configuration based on year
  if (year_config$year == 1770) {
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
                   fill = "#e5e7eb", color = "#6b7280", size = 0.3) +
      geom_polygon(data = states_categorized %>% filter(category == "Original Thirteen Colonies"),
                   aes(x = long, y = lat, group = group),
                   fill = web_colors$blue, color = "#1e40af", size = 0.5) +
      geom_polygon(data = states_categorized %>% filter(category == "Other British territories"),
                   aes(x = long, y = lat, group = group),
                   fill = web_colors$purple, color = "#6d28d9", size = 0.3, alpha = 0.6) +
      geom_polygon(data = states_categorized %>% filter(category == "Foreign areas"),
                   aes(x = long, y = lat, group = group),
                   fill = "#d1d5db", color = "#9ca3af", size = 0.2) +
      coord_map("albers", lat0 = 39, lat1 = 45, xlim = c(-130, -65), ylim = c(20, 50)) +
      labs(title = "TERRITORIAL GROWTH: 1775",
           subtitle = "Original Thirteen Colonies") +
      theme_void() +
      theme(
        plot.title = element_text(size = 18, face = "bold", hjust = 0.5, color = web_colors$primary),
        plot.subtitle = element_text(size = 14, hjust = 0.5, color = "#6b7280"),
        plot.margin = margin(20, 20, 20, 20)
      )

  } else if (year_config$year == 1800) {
    free_states <- c("new hampshire", "massachusetts", "rhode island", "connecticut",
                     "vermont", "new york", "new jersey", "pennsylvania")
    slave_states <- c("delaware", "maryland", "virginia", "north carolina",
                      "south carolina", "georgia", "kentucky", "tennessee")
    free_territories <- c("ohio", "indiana", "illinois", "michigan", "wisconsin")
    slave_territories <- c("mississippi", "alabama")

    states_categorized <- states_map %>%
      mutate(region = tolower(region)) %>%
      mutate(category = case_when(
        region %in% free_states ~ "Free States",
        region %in% slave_states ~ "Slave States",
        region %in% free_territories ~ "Free Territories",
        region %in% slave_territories ~ "Slave Territories",
        TRUE ~ "Other countries"
      ))

    p <- ggplot() +
      geom_polygon(data = na_map, aes(x = long, y = lat, group = group),
                   fill = "#e5e7eb", color = "#6b7280", size = 0.3) +
      geom_polygon(data = states_categorized %>% filter(category == "Free States"),
                   aes(x = long, y = lat, group = group),
                   fill = web_colors$blue, color = "#1e40af", size = 0.5) +
      geom_polygon(data = states_categorized %>% filter(category == "Slave States"),
                   aes(x = long, y = lat, group = group),
                   fill = web_colors$orange, color = "#c2410c", size = 0.5) +
      geom_polygon(data = states_categorized %>% filter(category == "Free Territories"),
                   aes(x = long, y = lat, group = group),
                   fill = web_colors$purple, color = "#6d28d9", size = 0.4, alpha = 0.7) +
      geom_polygon(data = states_categorized %>% filter(category == "Slave Territories"),
                   aes(x = long, y = lat, group = group),
                   fill = web_colors$pink, color = "#be185d", size = 0.4, alpha = 0.7) +
      geom_polygon(data = states_categorized %>% filter(category == "Other countries"),
                   aes(x = long, y = lat, group = group),
                   fill = "#d1d5db", color = "#9ca3af", size = 0.2) +
      coord_map("albers", lat0 = 39, lat1 = 45, xlim = c(-130, -65), ylim = c(20, 50)) +
      labs(title = "TERRITORIAL GROWTH: 1800",
           subtitle = "Free and Slave States/Territories") +
      theme_void() +
      theme(
        plot.title = element_text(size = 18, face = "bold", hjust = 0.5, color = web_colors$primary),
        plot.subtitle = element_text(size = 14, hjust = 0.5, color = "#6b7280"),
        plot.margin = margin(20, 20, 20, 20)
      )

  } else if (year_config$year == 1809) {
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
                   fill = "#e5e7eb", color = "#6b7280", size = 0.3) +
      geom_polygon(data = states_categorized %>% filter(category == "States"),
                   aes(x = long, y = lat, group = group),
                   fill = web_colors$blue, color = "#1e40af", size = 0.5) +
      geom_polygon(data = states_categorized %>% filter(category == "Territories"),
                   aes(x = long, y = lat, group = group),
                   fill = web_colors$pink, color = "#be185d", size = 0.4) +
      geom_polygon(data = states_categorized %>% filter(category == "Other countries"),
                   aes(x = long, y = lat, group = group),
                   fill = "#d1d5db", color = "#9ca3af", size = 0.2) +
      coord_map("albers", lat0 = 39, lat1 = 45, xlim = c(-130, -65), ylim = c(20, 50)) +
      labs(title = "TERRITORIAL GROWTH: 1809",
           subtitle = "After Louisiana Purchase") +
      theme_void() +
      theme(
        plot.title = element_text(size = 18, face = "bold", hjust = 0.5, color = web_colors$primary),
        plot.subtitle = element_text(size = 14, hjust = 0.5, color = "#6b7280"),
        plot.margin = margin(20, 20, 20, 20)
      )

  } else if (year_config$year == 1850) {
    states_1850 <- c("maine", "new hampshire", "vermont", "massachusetts", "rhode island",
                     "connecticut", "new york", "new jersey", "pennsylvania", "delaware",
                     "maryland", "virginia", "north carolina", "south carolina", "georgia",
                     "florida", "alabama", "mississippi", "louisiana", "texas", "arkansas",
                     "tennessee", "kentucky", "ohio", "indiana", "illinois", "michigan",
                     "wisconsin", "iowa", "missouri", "california")
    territories_1850 <- c("minnesota", "oregon", "washington", "utah", "new mexico",
                          "nebraska", "kansas", "montana", "wyoming", "colorado",
                          "north dakota", "south dakota", "idaho", "arizona", "nevada", "oklahoma")

    states_categorized <- states_map %>%
      mutate(region = tolower(region)) %>%
      mutate(category = case_when(
        region %in% states_1850 ~ "States",
        region %in% territories_1850 ~ "Territories",
        TRUE ~ "Other countries"
      ))

    p <- ggplot() +
      geom_polygon(data = na_map, aes(x = long, y = lat, group = group),
                   fill = "#e5e7eb", color = "#6b7280", size = 0.3) +
      geom_polygon(data = states_categorized %>% filter(category == "States"),
                   aes(x = long, y = lat, group = group),
                   fill = web_colors$blue, color = "#1e40af", size = 0.5) +
      geom_polygon(data = states_categorized %>% filter(category == "Territories"),
                   aes(x = long, y = lat, group = group),
                   fill = web_colors$orange, color = "#c2410c", size = 0.4) +
      geom_polygon(data = states_categorized %>% filter(category == "Other countries"),
                   aes(x = long, y = lat, group = group),
                   fill = "#d1d5db", color = "#9ca3af", size = 0.2) +
      coord_map("albers", lat0 = 39, lat1 = 45, xlim = c(-130, -65), ylim = c(20, 50)) +
      labs(title = "TERRITORIAL GROWTH: 1850",
           subtitle = "Continental Expansion Complete") +
      theme_void() +
      theme(
        plot.title = element_text(size = 18, face = "bold", hjust = 0.5, color = web_colors$primary),
        plot.subtitle = element_text(size = 14, hjust = 0.5, color = "#6b7280"),
        plot.margin = margin(20, 20, 20, 20)
      )
  }

  ggsave(paste0(output_dir, filename), p, width = 11, height = 7, dpi = 150, bg = "white")
  message(paste("Generated:", filename))
}

# Generate territory maps
generate_territory_map(list(year = 1770), "5-1-territories-1770.png")
generate_territory_map(list(year = 1800), "5-2-territories-1800.png")
generate_territory_map(list(year = 1809), "5-3-territories-1809.png")
generate_territory_map(list(year = 1850), "5-4-territories-1850.png")

# =============================================================================
# FIGURE 5.5: US MINERAL PRODUCTION
# =============================================================================

mineral_data <- data.frame(
  Mineral = c("Natural Gas", "Petroleum", "Copper", "Phosphate", "Coal",
              "Molybdenum", "Bauxite", "Zinc", "Iron Ore", "Lead",
              "Silver", "Salt", "Gold", "Tungsten"),
  Percent = c(95, 65, 56, 43, 39, 38, 37, 37, 36, 34, 30, 20, 20, 17)
)

# Create color gradient based on percentage
mineral_data$fill_color <- case_when(
  mineral_data$Percent >= 60 ~ web_colors$red,
  mineral_data$Percent >= 40 ~ web_colors$orange,
  mineral_data$Percent >= 30 ~ "#eab308",  # Yellow
  TRUE ~ web_colors$green
)

p_minerals <- ggplot(mineral_data, aes(x = Percent, y = reorder(Mineral, Percent), fill = fill_color)) +
  geom_bar(stat = "identity", color = "white", size = 0.3) +
  geom_text(aes(label = paste0(Percent, "%")),
            hjust = -0.2, color = "black", size = 4, fontface = "bold") +
  scale_fill_identity() +
  theme_minimal() +
  theme(
    plot.title = element_text(size = 16, face = "bold", hjust = 0.5, color = web_colors$primary),
    plot.subtitle = element_text(size = 12, color = "#6b7280", hjust = 0.5),
    axis.title = element_text(size = 11, color = "#374151", face = "bold"),
    axis.text = element_text(size = 10, color = "#374151"),
    axis.text.y = element_text(face = "bold"),
    panel.grid.major.x = element_line(color = "#e5e7eb", size = 0.3),
    panel.grid.major.y = element_blank(),
    panel.grid.minor = element_blank(),
    plot.margin = margin(20, 40, 20, 20)
  ) +
  labs(
    title = "US Mineral Production as % of World Output (1913)",
    subtitle = "America's Resource Dominance",
    x = "Percent of World Output", y = NULL
  ) +
  scale_x_continuous(limits = c(0, 110), breaks = seq(0, 100, by = 20))

ggsave(paste0(output_dir, "5-5-minerals-1913.png"), p_minerals, width = 10, height = 7, dpi = 150, bg = "white")
message("Generated: 5-5-minerals-1913.png")

# =============================================================================
# FIGURE 8.1: TRUST IN GOVERNMENT DECLINE
# =============================================================================

trust_data <- data.frame(
  year = c(1958, 1964, 1966, 1968, 1970, 1972, 1974, 1976, 1978),
  trust_pct = c(73, 77, 65, 61, 54, 53, 36, 34, 30)
)

p_trust <- ggplot(trust_data, aes(x = year, y = trust_pct)) +
  geom_ribbon(aes(ymin = 20, ymax = trust_pct), fill = web_colors$red, alpha = 0.2) +
  geom_line(color = web_colors$red, size = 2) +
  geom_point(color = web_colors$red, size = 4, fill = "white", shape = 21, stroke = 2) +
  geom_text(aes(label = paste0(trust_pct, "%")), vjust = -1.5, size = 3.5, fontface = "bold", color = web_colors$red) +
  annotate("segment", x = 1963, xend = 1963, y = 25, yend = 75,
           linetype = "dashed", color = "#6b7280", size = 0.5) +
  annotate("text", x = 1963, y = 23, label = "JFK", size = 3, color = "#6b7280") +
  annotate("segment", x = 1968, xend = 1968, y = 25, yend = 60,
           linetype = "dashed", color = "#6b7280", size = 0.5) +
  annotate("text", x = 1968, y = 23, label = "MLK/RFK", size = 3, color = "#6b7280") +
  annotate("segment", x = 1974, xend = 1974, y = 25, yend = 35,
           linetype = "dashed", color = "#6b7280", size = 0.5) +
  annotate("text", x = 1974, y = 23, label = "Nixon", size = 3, color = "#6b7280") +
  scale_y_continuous(limits = c(20, 85), breaks = seq(20, 80, by = 20)) +
  scale_x_continuous(breaks = trust_data$year) +
  theme_minimal() +
  theme(
    plot.title = element_text(size = 16, face = "bold", hjust = 0.5, color = web_colors$primary),
    plot.subtitle = element_text(size = 12, color = "#6b7280", hjust = 0.5),
    axis.title = element_text(size = 11, color = "#374151"),
    axis.text = element_text(size = 10, color = "#374151"),
    panel.grid.major = element_line(color = "#f3f4f6"),
    panel.grid.minor = element_blank(),
    plot.margin = margin(20, 20, 20, 20)
  ) +
  labs(
    title = "The Collapse of Trust in Government (1958-1978)",
    subtitle = "Percentage who trust the federal government 'just about always' or 'most of the time'",
    x = "Year", y = "Trust (%)"
  )

ggsave(paste0(output_dir, "8-1-trust-decline.png"), p_trust, width = 12, height = 7, dpi = 150, bg = "white")
message("Generated: 8-1-trust-decline.png")

# =============================================================================
# FIGURE 9.1-9.3: INCOME AND WEALTH INEQUALITY
# =============================================================================

# Mean Income Data
income_data <- data.frame(
  Year = rep(c(1968, 1978, 1988, 1998, 2008, 2018, 2023), 5),
  Group = rep(c("Bottom 20%", "Second 20%", "Middle 20%", "Fourth 20%", "Top 5%"), each = 7),
  Income = c(
    # Bottom 20%
    14000, 15000, 15500, 16000, 15500, 15000, 16000,
    # Second 20%
    32000, 35000, 37000, 40000, 41000, 42000, 44000,
    # Middle 20%
    52000, 58000, 62000, 68000, 70000, 73000, 77000,
    # Fourth 20%
    75000, 85000, 95000, 108000, 115000, 125000, 133000,
    # Top 5%
    175000, 200000, 280000, 380000, 400000, 480000, 550000
  )
)

income_colors <- c("Bottom 20%" = web_colors$purple, "Second 20%" = web_colors$blue,
                   "Middle 20%" = web_colors$green, "Fourth 20%" = web_colors$orange,
                   "Top 5%" = web_colors$red)

p_income <- ggplot(income_data, aes(x = Year, y = Income/1000, color = Group, group = Group)) +
  geom_line(size = 2) +
  geom_point(size = 3) +
  scale_color_manual(values = income_colors) +
  scale_y_continuous(labels = scales::dollar_format(suffix = "K")) +
  theme_minimal() +
  theme(
    plot.title = element_text(size = 14, face = "bold", hjust = 0.5, color = web_colors$primary),
    plot.subtitle = element_text(size = 11, color = "#6b7280", hjust = 0.5),
    legend.position = "bottom",
    legend.title = element_blank(),
    panel.grid.minor = element_blank(),
    plot.margin = margin(20, 20, 20, 20)
  ) +
  labs(
    title = "Mean Household Income by Quintile (1968-2023)",
    subtitle = "The Great Divergence in American Incomes",
    x = "Year", y = "Mean Income"
  )

ggsave(paste0(output_dir, "9-1-mean-income.png"), p_income, width = 12, height = 8, dpi = 150, bg = "white")
message("Generated: 9-1-mean-income.png")

# Share of Income Data
share_data <- data.frame(
  Year = rep(c(1968, 1978, 1988, 1998, 2008, 2018, 2023), 4),
  Group = rep(c("Bottom 20%", "Middle 60%", "Top 20%", "Top 5%"), each = 7),
  Share = c(
    # Bottom 20%
    4.2, 4.3, 3.8, 3.6, 3.4, 3.1, 3.0,
    # Middle 60%
    52.3, 52.4, 49.7, 47.2, 45.8, 44.2, 43.5,
    # Top 20%
    43.5, 43.3, 46.5, 49.2, 50.8, 52.7, 53.5,
    # Top 5%
    17.4, 16.8, 18.3, 21.4, 21.5, 23.1, 24.2
  )
)

share_colors <- c("Bottom 20%" = web_colors$purple, "Middle 60%" = web_colors$blue,
                  "Top 20%" = web_colors$orange, "Top 5%" = web_colors$red)

p_share <- ggplot(share_data, aes(x = Year, y = Share, color = Group, group = Group)) +
  geom_line(size = 2) +
  geom_point(size = 3) +
  scale_color_manual(values = share_colors) +
  scale_y_continuous(labels = function(x) paste0(x, "%")) +
  theme_minimal() +
  theme(
    plot.title = element_text(size = 14, face = "bold", hjust = 0.5, color = web_colors$primary),
    plot.subtitle = element_text(size = 11, color = "#6b7280", hjust = 0.5),
    legend.position = "bottom",
    legend.title = element_blank(),
    panel.grid.minor = element_blank(),
    plot.margin = margin(20, 20, 20, 20)
  ) +
  labs(
    title = "Share of Total Household Income (1968-2023)",
    subtitle = "Rising Inequality: Top Gains, Bottom and Middle Lose",
    x = "Year", y = "Share of Total Income"
  )

ggsave(paste0(output_dir, "9-2-share-income.png"), p_share, width = 12, height = 8, dpi = 150, bg = "white")
message("Generated: 9-2-share-income.png")

# Wealth Share Data
wealth_data <- data.frame(
  Year = rep(c(1990, 2000, 2010, 2020, 2024), 3),
  Group = rep(c("Top 1%", "Top 10%", "Bottom 50%"), each = 5),
  Share = c(
    # Top 1%
    23, 30, 31, 32, 30,
    # Top 10%
    60, 66, 67, 69, 67,
    # Bottom 50%
    4, 3, 2, 2, 2
  )
)

wealth_colors <- c("Top 1%" = web_colors$red, "Top 10%" = web_colors$orange, "Bottom 50%" = web_colors$blue)

p_wealth <- ggplot(wealth_data, aes(x = Year, y = Share, color = Group, group = Group)) +
  geom_line(size = 2) +
  geom_point(size = 3) +
  scale_color_manual(values = wealth_colors) +
  scale_y_continuous(labels = function(x) paste0(x, "%"), limits = c(0, 75)) +
  theme_minimal() +
  theme(
    plot.title = element_text(size = 14, face = "bold", hjust = 0.5, color = web_colors$primary),
    plot.subtitle = element_text(size = 11, color = "#6b7280", hjust = 0.5),
    legend.position = "bottom",
    legend.title = element_blank(),
    panel.grid.minor = element_blank(),
    plot.margin = margin(20, 20, 20, 20)
  ) +
  labs(
    title = "Share of Total Household Wealth (1990-2024)",
    subtitle = "Extreme Wealth Concentration",
    x = "Year", y = "Share of Total Wealth"
  )

ggsave(paste0(output_dir, "9-3-wealth-share.png"), p_wealth, width = 12, height = 8, dpi = 150, bg = "white")
message("Generated: 9-3-wealth-share.png")

# =============================================================================
# FIGURE 10.1-10.2: WALMART GROWTH
# =============================================================================

walmart_data <- data.frame(
  Year = c(1962, 1967, 1970, 1972, 1975, 1980, 1985, 1990, 1995, 2000, 2005),
  Stores = c(1, 24, 32, 51, 125, 276, 882, 1528, 2943, 4189, 6141)
)

p_walmart <- ggplot(walmart_data, aes(x = Year, y = Stores)) +
  geom_area(fill = web_colors$blue, alpha = 0.3) +
  geom_line(color = web_colors$blue, size = 2) +
  geom_point(color = web_colors$blue, size = 4, fill = "white", shape = 21, stroke = 2) +
  geom_text(aes(label = scales::comma(Stores)), vjust = -1, size = 3, fontface = "bold") +
  scale_y_continuous(labels = scales::comma, limits = c(0, 7000)) +
  theme_minimal() +
  theme(
    plot.title = element_text(size = 16, face = "bold", hjust = 0.5, color = web_colors$primary),
    plot.subtitle = element_text(size = 12, color = "#6b7280", hjust = 0.5),
    panel.grid.minor = element_blank(),
    plot.margin = margin(20, 20, 20, 20)
  ) +
  labs(
    title = "Growth of Walmart (1962-2005)",
    subtitle = "From Single Store to Retail Empire",
    x = "Year", y = "Number of Stores"
  )

ggsave(paste0(output_dir, "10-1-wal-growth.png"), p_walmart, width = 11, height = 7, dpi = 150, bg = "white")
message("Generated: 10-1-wal-growth.png")

# Walmart Maps - simplified representation
p_walmart_map <- ggplot() +
  geom_polygon(data = map_data("state"), aes(x = long, y = lat, group = group),
               fill = "#e5e7eb", color = "white", size = 0.3) +
  # Arkansas (origin)
  annotate("point", x = -92.3, y = 34.7, color = web_colors$red, size = 6) +
  annotate("text", x = -92.3, y = 32.5, label = "1962\nRogers, AR", size = 3, color = web_colors$red, fontface = "bold") +
  # Expansion points
  annotate("point", x = c(-95, -90, -88, -85, -97, -100),
           y = c(33, 35, 38, 32, 38, 35),
           color = web_colors$blue, size = 3, alpha = 0.6) +
  coord_map("albers", lat0 = 39, lat1 = 45, xlim = c(-125, -68), ylim = c(25, 50)) +
  theme_void() +
  theme(
    plot.title = element_text(size = 16, face = "bold", hjust = 0.5, color = web_colors$primary),
    plot.subtitle = element_text(size = 12, color = "#6b7280", hjust = 0.5),
    plot.margin = margin(20, 20, 20, 20)
  ) +
  labs(
    title = "Walmart Geographic Expansion",
    subtitle = "From Arkansas to Nationwide"
  )

ggsave(paste0(output_dir, "10-2-wal-maps.png"), p_walmart_map, width = 11, height = 7, dpi = 150, bg = "white")
message("Generated: 10-2-wal-maps.png")

# =============================================================================
# FIGURE 11.1-11.4: HOUSING BUBBLE AND WEALTH
# =============================================================================

# National Home Prices
housing_data <- data.frame(
  Year = 2000:2010,
  Index = c(227, 244, 260, 283, 320, 360, 370, 355, 295, 257, 250)
)

p_housing <- ggplot(housing_data, aes(x = Year, y = Index)) +
  annotate("rect", xmin = 2007, xmax = 2010, ymin = 200, ymax = 400,
           fill = web_colors$red, alpha = 0.1) +
  annotate("text", x = 2008.5, y = 390, label = "Crisis", color = web_colors$red, fontface = "bold", size = 4) +
  geom_ribbon(aes(ymin = 200, ymax = Index), fill = web_colors$orange, alpha = 0.3) +
  geom_line(color = web_colors$orange, size = 2) +
  geom_point(color = web_colors$orange, size = 4, fill = "white", shape = 21, stroke = 2) +
  geom_point(data = housing_data[housing_data$Year == 2006,],
             color = web_colors$red, size = 6) +
  annotate("text", x = 2006, y = 385, label = "Peak", color = web_colors$red, fontface = "bold") +
  scale_y_continuous(limits = c(200, 400)) +
  theme_minimal() +
  theme(
    plot.title = element_text(size = 16, face = "bold", hjust = 0.5, color = web_colors$primary),
    plot.subtitle = element_text(size = 12, color = "#6b7280", hjust = 0.5),
    panel.grid.minor = element_blank(),
    plot.margin = margin(20, 20, 20, 20)
  ) +
  labs(
    title = "U.S. National Home Price Index (2000-2010)",
    subtitle = "The Housing Bubble: Rise and Crash",
    x = "Year", y = "Home Price Index"
  )

ggsave(paste0(output_dir, "11-1-national-home-prices.png"), p_housing, width = 12, height = 7, dpi = 150, bg = "white")
message("Generated: 11-1-national-home-prices.png")

# State Home Prices
state_data <- data.frame(
  Year = rep(2000:2005, 5),
  State = rep(c("Nevada", "Arizona", "Florida", "California", "Hawaii"), each = 6),
  Index = c(
    100, 110, 125, 150, 185, 235,  # Nevada
    100, 108, 120, 140, 170, 210,  # Arizona
    100, 107, 118, 138, 168, 205,  # Florida
    100, 110, 125, 145, 175, 195,  # California
    100, 105, 112, 125, 145, 170   # Hawaii
  )
)

state_colors <- c("Nevada" = web_colors$red, "Arizona" = web_colors$orange,
                  "Florida" = "#eab308", "California" = web_colors$green, "Hawaii" = web_colors$blue)

p_states <- ggplot(state_data, aes(x = Year, y = Index, color = State, group = State)) +
  geom_line(size = 2) +
  geom_point(size = 3) +
  scale_color_manual(values = state_colors) +
  theme_minimal() +
  theme(
    plot.title = element_text(size = 14, face = "bold", hjust = 0.5, color = web_colors$primary),
    plot.subtitle = element_text(size = 11, color = "#6b7280", hjust = 0.5),
    legend.position = "bottom",
    legend.title = element_blank(),
    panel.grid.minor = element_blank(),
    plot.margin = margin(20, 20, 20, 20)
  ) +
  labs(
    title = "Top 5 States by Home Price Appreciation (2000-2005)",
    subtitle = "Bubble States: Greatest Gains, Greatest Losses",
    x = "Year", y = "Home Price Index (2000 = 100)"
  )

ggsave(paste0(output_dir, "11-2-state-home-prices.png"), p_states, width = 11, height = 7, dpi = 150, bg = "white")
message("Generated: 11-2-state-home-prices.png")

# Wealth Distribution 2025
wealth_2025 <- data.frame(
  Category = factor(c("Top 1%", "Next 9%", "Next 40%", "Bottom 50%"),
                    levels = c("Top 1%", "Next 9%", "Next 40%", "Bottom 50%")),
  Share = c(30.3, 36.8, 30.2, 2.6)
)

wealth_2025_colors <- c("Top 1%" = web_colors$red, "Next 9%" = web_colors$orange,
                        "Next 40%" = web_colors$blue, "Bottom 50%" = web_colors$purple)

p_wealth_2025 <- ggplot(wealth_2025, aes(x = Category, y = Share, fill = Category)) +
  geom_bar(stat = "identity", color = "white", size = 0.5) +
  geom_text(aes(label = paste0(Share, "%")), vjust = -0.5, size = 5, fontface = "bold") +
  scale_fill_manual(values = wealth_2025_colors) +
  scale_y_continuous(limits = c(0, 45), labels = function(x) paste0(x, "%")) +
  theme_minimal() +
  theme(
    plot.title = element_text(size = 16, face = "bold", hjust = 0.5, color = web_colors$primary),
    plot.subtitle = element_text(size = 12, color = "#6b7280", hjust = 0.5),
    legend.position = "none",
    axis.text.x = element_text(size = 11, face = "bold"),
    panel.grid.major.x = element_blank(),
    plot.margin = margin(20, 20, 20, 20)
  ) +
  labs(
    title = "Distribution of Household Wealth in the U.S. (Q1 2025)",
    subtitle = "Top 10% holds 67% of all wealth",
    x = NULL, y = "Share of Total Wealth"
  )

ggsave(paste0(output_dir, "11-3-wealth-distribution-2025.png"), p_wealth_2025, width = 11, height = 7, dpi = 150, bg = "white")
message("Generated: 11-3-wealth-distribution-2025.png")

# Income Share by Tier
income_tier_data <- data.frame(
  Year = rep(seq(1970, 2022, by = 4), 3),
  Tier = rep(c("Upper", "Middle", "Lower"), each = 14),
  Share = c(
    # Upper
    29, 30, 32, 34, 37, 40, 43, 45, 47, 48, 49, 50, 51, 52,
    # Middle
    62, 61, 59, 57, 54, 51, 48, 46, 44, 43, 42, 41, 40, 39,
    # Lower
    10, 10, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9
  )
)

tier_colors <- c("Upper" = web_colors$red, "Middle" = web_colors$blue, "Lower" = web_colors$purple)

p_tiers <- ggplot(income_tier_data, aes(x = Year, y = Share, color = Tier, group = Tier)) +
  geom_line(size = 2) +
  geom_point(size = 2) +
  scale_color_manual(values = tier_colors) +
  scale_y_continuous(labels = function(x) paste0(x, "%")) +
  theme_minimal() +
  theme(
    plot.title = element_text(size = 14, face = "bold", hjust = 0.5, color = web_colors$primary),
    plot.subtitle = element_text(size = 11, color = "#6b7280", hjust = 0.5),
    legend.position = "bottom",
    legend.title = element_blank(),
    panel.grid.minor = element_blank(),
    plot.margin = margin(20, 20, 20, 20)
  ) +
  labs(
    title = "Share of Total U.S. Household Income by Tier (1970-2022)",
    subtitle = "Upper tier gains as middle and lower tiers decline",
    x = "Year", y = "Share of Total Income"
  )

ggsave(paste0(output_dir, "11-4-income-share.png"), p_tiers, width = 11, height = 7, dpi = 150, bg = "white")
message("Generated: 11-4-income-share.png")

message("\n========================================")
message("All figures generated successfully!")
message("Output directory: ", output_dir)
message("========================================")
