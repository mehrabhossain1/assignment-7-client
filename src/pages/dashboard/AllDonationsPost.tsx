/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Button, Modal, Table, Form, Input, InputNumber } from "antd";
import {
  useCustomDispatch,
  useDonationsQuery,
} from "../../redux/features/donations/donationsApi";
import axios from "axios";
import {
  deleteDonation,
  setDonations,
  updateDonation,
} from "../../redux/features/donations/donationSlice";

interface Donation {
  _id: string;
  title: string;
  category: string;
  amount: number;
}

const AllDonationsPost: React.FC = () => {
  const dispatch = useCustomDispatch();
  const { data, isLoading, isError, refetch } = useDonationsQuery("");
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<Donation | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!isLoading && !isError) {
      dispatch(setDonations(data.donations));
    }
    refetch();
  }, [data, isLoading, isError, dispatch, refetch]);

  const handleEdit = (record: Donation) => {
    setSelectedRecord(record);
    setEditModalVisible(true);
    form.setFieldsValue({
      title: record.title,
      category: record.category,
      amount: record.amount,
    });
  };

  const handleDelete = (record: Donation) => {
    setSelectedRecord(record);
    setDeleteModalVisible(true);
  };

  const onFinishEdit = async (values: any) => {
    try {
      console.log("Edited values:", values);
      const response = await axios.put<Donation>(
        `https://l2-b2-assignment-6-backend-mehrabhossain1-3kr1dkaln.vercel.app/api/v1/donations/${selectedRecord?._id}`,
        values
      );
      dispatch(updateDonation(response.data)); // Assuming the updated donation is returned from the server
      setEditModalVisible(false);
      refetch();
    } catch (error) {
      console.error("Error updating donation:", error);
    }
  };

  const onFinishDelete = async () => {
    try {
      console.log("Deleted donation:", selectedRecord);
      if (selectedRecord) {
        await axios.delete(
          `https://l2-b2-assignment-6-backend-mehrabhossain1-3kr1dkaln.vercel.app/api/v1/donations/${selectedRecord._id}`
        );
        dispatch(deleteDonation(selectedRecord)); // Send the entire record to be deleted
        setDeleteModalVisible(false);
        refetch();
      }
    } catch (error) {
      console.error("Error deleting donation:", error);
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Action",
      render: (_: any, record: Donation) => (
        <>
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button onClick={() => handleDelete(record)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data?.donations}
        rowKey={(record) => record._id}
      />
      <Modal
        title="Edit Donation"
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={onFinishEdit}>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please enter category" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Amount"
            name="amount"
            rules={[{ required: true, message: "Please enter amount" }]}
          >
            <InputNumber />
          </Form.Item>
          <Button className="bg-green-500" type="primary" htmlType="submit">
            Save
          </Button>
        </Form>
      </Modal>
      <Modal
        title="Confirm Delete"
        visible={deleteModalVisible}
        onCancel={() => setDeleteModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setDeleteModalVisible(false)}>
            Cancel
          </Button>,
          <Button
            key="delete"
            className="bg-red-500"
            type="primary"
            onClick={onFinishDelete}
          >
            Delete
          </Button>,
        ]}
      >
        <p>Are you sure you want to delete this donation?</p>
      </Modal>
    </div>
  );
};

export default AllDonationsPost;
