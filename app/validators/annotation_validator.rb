class AnnotationValidator < ActiveModel::EachValidator
  def validate(record)
    if has_intersecting_indices(record) == true
      record.errors.add(:annotation, "There is an error. Please refresh.")
    end
  end

  def has_intersecting_indices(annotation)
    track = annotation.track
    track_annotations = track.annotations.sort { |a, b| a.start_index <=> b.start_index }
    annotation_end = annotation.end_index
    annotation_start = annotation.start_index
    for track_anno in track_annotations do
      if annotation_start <= track_anno.end_index && annotation_end >= track_anno.start_index
        return true
      end
    end
    return false
  end
end