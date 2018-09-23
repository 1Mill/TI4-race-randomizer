# Load packages
library(tidyverse)
library(gsheet)
library(snakecase)
library(jsonlite)

# Import Raw Data file googledrive
# raw_data = read_csv("TI_4 Evernoob's_Super_Cheat_Sheet_Factions.csv")
raw_data = gsheet::gsheet2tbl("https://docs.google.com/spreadsheets/d/1Y_av0_M5Cyz8viBIMOqDjf_ZbawR9GGNWztPqR-zuso/edit#gid=0")
data = raw_data

# Organize data better
## Rename first column to X1 for easy naming purposes
colnames(data)[colnames(data) == "Factions of Twilight Imperium - Fourth Edition"] = "X1"

## Rows that are staying and staying
staying = c("X1", "X2", "X3")
moving = c("X5", "X6", "X7")

staying_rows = data %>% select(staying)
moving_rows = data %>% select(moving)

## Rename moving rows to make binding more easy
moving_rows = moving_rows %>% rename("X1" = "X5", "X2" = "X6", "X3" = "X7")

## Rebind rows
data = bind_rows(staying_rows, moving_rows)

## Remove empty rows
data = data %>% filter_all(any_vars(!is.na(.)))

# Initialize a new data frame
df = data.frame(
    Name = character(),
    HomeSystem = character(),
    Abilities = character(),
    Commodities = character(),
    PromissaryNote = character(),
    StartingFleet = character(),
    StartingTech = character(),
    SpecialUnits = character(),
    FactionTech = character(),
    Flagship = character(),
    stringsAsFactors = FALSE
  )

# Iterate through each race (i.e. 10 rows == one race) to parse information and there are a total of 17 races.
for (n in 1:17) {
  i = 10 * (n - 1) + 1
  
  df[n, "name"]           = data[i, 1]
  df[n, "homeSystem"]     = data[i+1, 2]
  df[n, "abilities"]      = data[i+2, 2]
  df[n, "commodities"]    = data[i+3, 2]
  df[n, "promissaryNote"] = data[i+4, 2]
  df[n, "startingFleet"]  = data[i+5, 2]
  df[n, "startingTech"]   = data[i+6, 2]
  df[n, "specialUnits"]   = data[i+7, 2]
  df[n, "factionTech"]    = data[i+8, 2]
  df[n, "flagship"]       = data[i+9, 2]
}

# Add custom columns (difficulty and friendly URL name)
starting_races = c("Barony of Letnev", "Emirates of Hacan", "Sardak N'orr", "Federation of Sol", "Universities of Jol-Nar", "Xxcha Kingdom")

df = df %>% 
  mutate(Difficulty = ifelse(Name %in% starting_races, 1, 7), UrlName = snakecase::to_any_case(Name, "snake"))

# Export manupulated data as JSON file
df.json = jsonlite::toJSON(df, pretty=FALSE)

write(paste('{"races":', df.json, '}'), "../db.json")
