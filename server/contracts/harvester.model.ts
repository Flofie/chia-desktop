export interface HarvesterModel {
  failed_to_open_filenames: string[];
  not_found_filenames: string[];
  plots: string[];
  success: boolean;
  _id: string;
  connection: string;
  timestamp: Date;
}
