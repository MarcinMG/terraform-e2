resource "aws_dynamodb_table" "basic-dynamodb-table" {
  name           = "LogTest"
  billing_mode   = "PROVISIONED"
  read_capacity  = 20
  write_capacity = 20
  hash_key       = "timestamp"
  range_key      = "id"

  attribute {
    name = "timestamp"
    type = "N"
  }

  attribute {
    name = "id"
    type = "N"
  }

  attribute {
    name = "date"
    type = "S"
  }

  attribute {
    name = "ip_address"
    type = "S"
  }

  ttl {
    attribute_name = "TimeToExist"
    enabled        = false
  }

  global_secondary_index {
    name               = "LogTitleIndex"
    hash_key           = "date"
    range_key          = "ip_address"
    write_capacity     = 10
    read_capacity      = 10
    projection_type    = "INCLUDE"
    non_key_attributes = ["timestamp"]
  }

  tags = {
    Name        = "dynamodb-table-1"
    Environment = "production"
  }
}