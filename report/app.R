library(shiny)
library(rmarkdown)

# UI
ui <- fluidPage(
  
  sidebarLayout(
    sidebarPanel(
      textInput("name", "Name:", ""),
      textInput("email", "Email:", ""),
      textAreaInput("report", "Today's Report:", ""),
      actionButton("submit", "View Report")
    ),
    
    mainPanel(
      uiOutput("report_ui"),
      downloadButton("downloadReport", "Submit Report")
    )
  )
)

# Server
server <- function(input, output) {
  
  # Create a reactive expression to store form data
  formData <- reactive({
    list(
      name = input$name,
      email = input$email,
      report = input$report
    )
  })
  
  # Render the report in the UI
  output$report_ui <- renderUI({
    req(input$submit > 0)  # Ensure the submit button has been pressed
    
    tagList(
      h4("Preview of Your Report"),
      p(paste("Name:", formData()$name)),
      p(paste("Email:", formData()$email)),
      p("Report:"),
      p(formData()$report)
    )
  })
  
  # Generate the PDF report
  output$downloadReport <- downloadHandler(
    filename = function() {
      paste("report_", Sys.Date(), ".pdf", sep = "")
    },
    content = function(file) {
      rmarkdown::render(
        input = "report_template.Rmd", 
        output_file = file,
        params = formData(),
        envir = new.env(parent = globalenv()) # Use a clean environment
      )
    }
  )
}

# Run the app
shinyApp(ui = ui, server = server)
