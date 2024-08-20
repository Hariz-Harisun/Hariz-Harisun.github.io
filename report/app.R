library(shiny)
library(rmarkdown)
ui <- fluidPage(
  titlePanel("Daily Report Form"),
  
  sidebarLayout(
    sidebarPanel(
      textInput("name", "Name:", ""),
      textInput("email", "Email:", ""),
      textAreaInput("report", "Today's Report:", ""),
      actionButton("submit", "Submit")
    ),
    
    mainPanel(
      uiOutput("report_ui"),
      downloadButton("downloadReport", "Download Report")
    )
  )
)

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
    if(input$submit > 0){
      h4("Preview of Your Report")
      p(paste("Name:", formData()$name))
      p(paste("Email:", formData()$email))
      p("Report:")
      p(formData()$report)
    }
  })
  
  # Generate the PDF report
  output$downloadReport <- downloadHandler(
    filename = function() {
      paste("report_", Sys.Date(), ".pdf", sep = "")
    },
    content = function(file) {
      rmarkdown::render("report_template.Rmd", 
                        output_file = file,
                        params = formData())
    }
  )
}

shinyApp(ui = ui, server = server)