
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  FilePdf, 
  FileImage, 
  File,
  Download,
  Eye,
  Upload,
  Trash
} from "lucide-react";
import { toast } from "sonner";

interface EmployeeDocumentsProps {
  employeeId: string;
}

// Mock document data
const documents = [
  {
    id: "DOC001",
    name: "ID Card",
    filename: "id_card.jpg",
    type: "jpg",
    size: "1.2 MB",
    uploadedOn: "Jan 15, 2022",
    status: "Verified",
  },
  {
    id: "DOC002",
    name: "Resume",
    filename: "resume.pdf",
    type: "pdf",
    size: "532 KB",
    uploadedOn: "Jan 15, 2022",
    status: "Verified",
  },
  {
    id: "DOC003",
    name: "Offer Letter",
    filename: "offer_letter.pdf",
    type: "pdf",
    size: "845 KB",
    uploadedOn: "Jan 16, 2022",
    status: "Verified",
  },
  {
    id: "DOC004",
    name: "Contract",
    filename: "employment_contract.pdf",
    type: "pdf",
    size: "1.5 MB",
    uploadedOn: "Jan 16, 2022",
    status: "Verified",
  },
  {
    id: "DOC005",
    name: "Educational Certificate",
    filename: "certificate.pdf",
    type: "pdf",
    size: "2.1 MB",
    uploadedOn: "Jan 20, 2022",
    status: "Pending",
  },
];

const DocumentIcon = ({ fileType }: { fileType: string }) => {
  switch (fileType.toLowerCase()) {
    case "pdf":
      return <FilePdf className="h-5 w-5 text-red-500" />;
    case "jpg":
    case "jpeg":
    case "png":
      return <FileImage className="h-5 w-5 text-blue-500" />;
    case "doc":
    case "docx":
      return <FileText className="h-5 w-5 text-blue-600" />;
    default:
      return <File className="h-5 w-5 text-gray-500" />;
  }
};

const EmployeeDocuments = ({ employeeId }: EmployeeDocumentsProps) => {
  const handleUpload = () => {
    // Logic for file upload would go here
    console.log("Upload document for employee:", employeeId);
    toast.info("Document upload dialog would open here");
  };

  const handleDownload = (documentId: string, filename: string) => {
    console.log(`Downloading document ${documentId}: ${filename}`);
    toast.success(`Downloading ${filename}`);
  };

  const handleView = (documentId: string, filename: string) => {
    console.log(`Viewing document ${documentId}: ${filename}`);
    toast.info(`Viewing ${filename}`);
  };

  const handleDelete = (documentId: string, filename: string) => {
    console.log(`Deleting document ${documentId}: ${filename}`);
    toast.success(`Document ${filename} has been deleted`);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Employee Documents</CardTitle>
        <Button onClick={handleUpload} className="flex items-center gap-2">
          <Upload className="h-4 w-4" />
          <span>Upload</span>
        </Button>
      </CardHeader>
      <CardContent>
        {documents.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document Name</TableHead>
                <TableHead>File Type</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Uploaded On</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((document) => (
                <TableRow key={document.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <DocumentIcon fileType={document.type} />
                      <span>{document.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="uppercase">{document.type}</TableCell>
                  <TableCell>{document.size}</TableCell>
                  <TableCell>{document.uploadedOn}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        document.status === "Verified"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-yellow-50 text-yellow-700 border-yellow-200"
                      }
                    >
                      {document.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleView(document.id, document.filename)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownload(document.id, document.filename)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(document.id, document.filename)}
                      >
                        <Trash className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-1">No Documents</h3>
            <p className="text-muted-foreground text-sm">
              No documents have been uploaded for this employee yet.
            </p>
            <Button onClick={handleUpload} className="mt-4">
              Upload First Document
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmployeeDocuments;
