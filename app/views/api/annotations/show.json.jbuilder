json.partial! '/api/annotations/annotation', annotation: @annotation

json.annotator @annotation.annotator.username

json.comments @annotation.comments